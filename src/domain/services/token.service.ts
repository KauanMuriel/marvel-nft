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
            contentData: this.createJsonObject(content),
            owner: userUuid
        } as Token;

        return await this._tokenRepository.create(token);
    }

    public async getAll(): Promise<Token[]> {
        return await this._tokenRepository.getAll();
    }

    private async getRandomContentFromMarvelApi(): Promise<{ rawContent: any, contentType: ContentType }> {
        const randomContent = this.generateRandomContentType();
        const randomId = this.generateRandomId(randomContent);

        const marvelUrl = this.generateMarvelUrl(randomContent.toLowerCase(), randomId);
        const response = await fetch(marvelUrl);

        if (!response.ok) throw new BadRequestException("Insufficient effort");
        
        const json = await response.json();

        const rawContent = json.data.results[0];
        return { rawContent: rawContent, contentType: randomContent };
    }

    private generateMarvelUrl(contentType: string, randomId: string) {
        const apiAuthentication = ApiAuhorization.generateApiAuthorization;
        return `https://gateway.marvel.com:443/v1/public/${contentType}/${randomId}?${apiAuthentication}`;
    }

    private createJsonObject(content: any) {
        const contentString = JSON.stringify(content);
        const contentJson = JSON.parse(contentString);
        return contentJson;
    }

    private generateRandomContentType() {
        const randomContent = Math.floor(Math.random() * 3);
        const values = Object.values(ContentType);
        return values[randomContent];
    }

    private generateRandomId(type: ContentType) {
        const rangeIdLimits = { "Creator": 4000, "Character": 11000, "Comics": 8500};
        return Math.floor(Math.random() * rangeIdLimits[type.toString()]).toString();
    }

    private mapRawContentAccordingType(type: ContentType, rawContent: any) {
        console.log("TYPE - ", type)
        switch (type) {
            case ContentType.CHARACTER:
                console.log("CHARACTER")
                return Object.assign({}, {
                    id: rawContent.id,
                    name: rawContent.name,
                    description: rawContent.description,
                    thumbnail: rawContent.thumbnail.path,
                    comics: rawContent.comics.map((comic: any) => { return { id: comic.resourceUri } })
                });
            case ContentType.CREATOR:
                console.log("CREATOR")
                let comics = [];
                if (rawContent.comics.available > 0) {
                    comics = rawContent.comics.items.map((comic: any) => { return { id: comic.resourceUri } })
                }
                return Object.assign({}, {
                    id: rawContent.id,
                    fullname: rawContent.fullname,
                    thumbnail: rawContent.thumbnail.path,
                    sufix: rawContent.sufix,
                    comics: comics
                });
            case ContentType.COMICS:
                console.log("COMICS")
                let creators = [];
                if (rawContent.creators.available > 0) {
                    creators = rawContent.creators.items.map((creator: any) => { return creator.name });
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