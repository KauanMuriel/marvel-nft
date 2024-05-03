import { inject, injectable } from "inversify";
import { ITokenRepository } from "../interfaces/i.token.repository";
import { ITokenService } from "../interfaces/i.token.service";
import { TYPES } from "../../api/util/di/di-types";
import { ContentType } from "../enums/content-type";
import { Token } from "../entities/token.entity";

@injectable()
export class TokenService implements ITokenService {
    private readonly _tokenRepository: ITokenRepository;

    public constructor(@inject(TYPES.ITokenRepository) tokenRepository: ITokenRepository) {
        this._tokenRepository = tokenRepository;
    }

    public async mine(userUuid: string): Promise<Token> {
        const { rawContent, contentType } = await this.getRandomContentFromMarvelApi();
        const content = Object.assign({}, {
            id: rawContent.id,
            name: rawContent.name,
            description: rawContent.description,
            thumbnail: rawContent.thumbnail,
            comics: rawContent.comics.map((comic: any) => { return { id: comic.resourceUri } })
        })

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

    private async getRandomContentFromMarvelApi(): Promise<{ rawContent: any, contentType: ContentType}> {
        const randomContent = Math.floor(Math.random() * 3);
        const contentType = ContentType[randomContent];

        const response = await fetch(this.generateMarvelUrl(contentType, "2"));
        return { rawContent: (await response.json()).results[0], contentType: contentType };
    }

    private generateMarvelUrl(contentType: string, randomId: string) {
        return `https://gateway.marvel.com:443/v1/public/${contentType}/${randomId}?
        ts=1&
        apikey=${process.env.MARVEL_PUBLIC_KEY}&
        hash=${process.env.MARVEL_HASH}`
    }

    private createJsonObject(content: any) {
        const contentString = JSON.stringify(content);
        const contentJson = JSON.parse(contentString);
        return contentJson;
    }
}