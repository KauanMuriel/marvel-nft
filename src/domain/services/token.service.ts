import { inject, injectable } from "inversify";
import { ITokenRepository } from "../interfaces/i.token.repository";
import { ITokenService } from "../interfaces/i.token.service";
import { TYPES } from "../../api/util/di/di-types";
import { ContentType } from "../enums/content-type";
import { Token } from "../entities/token.entity";
import { BadRequestException } from "../exceptions/bad-request.exception";
import { ApiAuhorization } from "../../api/util/apiAuthorization";

@injectable()
export class TokenService implements ITokenService {
    private readonly _tokenRepository: ITokenRepository;

    public constructor(@inject(TYPES.ITokenRepository) tokenRepository: ITokenRepository) {
        this._tokenRepository = tokenRepository;
    }

    public async mine(userUuid: string): Promise<Token> {
        const { contentType, rawContent } = await this.getRandomContentFromMarvelApi();

        const content = this.mapRawContentAccordingType(contentType, rawContent);

        const token = {
            contentType: contentType,
            contentId: content.id,
            contentData: this.createJsonObject(content),
            owner: { uuid: userUuid }
        } as Token;

        return await this._tokenRepository.create(token);
    }

    public async getAll(): Promise<Token[]> {
        return await this._tokenRepository.getAll();
    }

    private async getRandomContentFromMarvelApi(): Promise<{ rawContent: any, contentType: ContentType }> {
        const randomContent = this.generateRandomContentType();
        const randomId = this.generateRandomId(randomContent);

        const existsToken = await this._tokenRepository.getByContent(randomId, randomContent);
        if (existsToken) throw new BadRequestException("Insufficient effort");

        const marvelUrl = this.generateMarvelUrl(randomContent.toLowerCase(), randomId);
        
        const response = await fetch(marvelUrl);
        if (!response.ok) throw new BadRequestException("Insufficient effort");

        const json = await response.json();
        const rawContent = json.data.results[0];
        return { rawContent: rawContent, contentType: randomContent };
    }

    private generateMarvelUrl(contentType: string, randomId: string) {
        const apiAuthentication = ApiAuhorization.generateApiAuthorization();
        const marvelUrl = `https://gateway.marvel.com:443/v1/public/${contentType}s/${randomId}?${apiAuthentication}`;

        return marvelUrl;
    }

    private createJsonObject(oldContent: any) {
        const newContent: object = {};
        for (const [key, value] of Object.entries(oldContent)) {
            if (key !== 'id') {
                newContent[key] = value;
            }
        }
        const contentString = JSON.stringify(newContent);
        const contentJson = JSON.parse(contentString);
        return contentJson;
    }

    private generateRandomContentType() {
        const randomContent = Math.floor(Math.random() * 3);
        const values = Object.values(ContentType);
        return values[randomContent];
    }

    private generateRandomId(type: ContentType) {
        const rangeIdLimits = { 
            "Creator": { max: 4000, min: 0 },
            "Character": { max: 1020000, min: 1000000 },
            "Comic": { max: 8500, min: 0 }
        };
        const typeRange = rangeIdLimits[type.toString()];
        const randomNumber = Math.floor(Math.random() * (typeRange.max - typeRange.min + 1)) + typeRange.min;
        return randomNumber.toString();
    }

    private mapRawContentAccordingType(type: ContentType, rawContent: any) {
        switch (type) {
            case ContentType.CHARACTER:
                let characterComics = [];
                if (rawContent.comics.available > 0) {
                    characterComics = rawContent.comics.items.map((comic: any) => { return { id: comic.resourceURI } });
                }
                return Object.assign({}, {
                    id: rawContent.id,
                    name: rawContent.name,
                    description: rawContent.description,
                    thumbnail: rawContent.thumbnail.path,
                    comics: characterComics
                });
            case ContentType.CREATOR:
                let creatorComics = [];
                if (rawContent.comics.available > 0) {
                    creatorComics = rawContent.comics.items.map((comic: any) => { return { id: comic.resourceURI } })
                }
                return Object.assign({}, {
                    id: rawContent.id,
                    fullname: rawContent.fullname,
                    thumbnail: rawContent.thumbnail.path,
                    sufix: rawContent.sufix,
                    comics: creatorComics
                });
            case ContentType.COMIC:
                let creators = [];
                if (rawContent.creators.available > 0) {
                    creators = rawContent.creators.items.map((creator: any) => { return { id: creator.resourceURI } });
                }
                return Object.assign({}, {
                    id: rawContent.id,
                    name: rawContent.title,
                    isbn: rawContent.isbn,
                    pageCount: rawContent.pageCount,
                    thumbnail: rawContent.thumbnail.path,
                    creator: creators
                });
        }
    }
}