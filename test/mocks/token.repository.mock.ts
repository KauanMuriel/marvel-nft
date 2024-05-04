import { injectable } from "inversify";
import { Token } from "../../src/domain/entities/token.entity";
import { ContentType } from "../../src/domain/enums/content-type";
import { ITokenRepository } from "../../src/domain/interfaces/i.token.repository";
import { User } from "../../src/domain/entities/user.entity";
import { TokenStatus } from "../../src/domain/enums/token-status";

@injectable()
export class TokenRepositoryMock implements ITokenRepository {
    private readonly tokens: Token[];

    public constructor() {
        const data = `{
            "id":7686,
            "name":"Captain America (1968) #305",
            "isbn":"",
            "pageCount":36,
            "thumbnail":"http://i.annihil.us/u/prod/marvel/i/mg/c/03/50ad698538028",
            "creator":["Diana Albers","Dennis Janke","Paul Neary"]}`;
        const dataJson = JSON.parse(data);
        this.tokens = [
            {
                uuid: "9bb3e71b-179d-4b8f-9fcf-360a3ad211ce",
                owner: { uuid: "ae430434-f3d5-492f-893a-78e110211a70" } as User,
                contentId: "15789",
                contentType: ContentType.COMIC,
                contentData: dataJson,
                status: TokenStatus.OWNED
            },
            {
                uuid: "d7158a0f-c497-4939-a903-e45490b464a6",
                owner: { uuid: "ae430434-f3d5-492f-893a-78e110211a70" } as User,
                contentId: "15789",
                contentType: ContentType.CHARACTER,
                contentData: dataJson,
                status: TokenStatus.FOR_SALE
            },
            {
                uuid: "045e0684-0a0b-45b9-af15-424e90182c91",
                owner: { uuid: "ae430434-f3d5-492f-893a-78e110211a70" } as User,
                contentId: "15789",
                contentType: ContentType.CREATOR,
                contentData: dataJson,
                status: TokenStatus.FOR_EXCHANGE
            }
        ]
    }
    getByContent(contentId: string, contentType: ContentType): Promise<Token> {
        return new Promise((resolve, reject) => {
            resolve(this.tokens.find((token) =>
                token.contentId === contentId && token.contentType === contentType)
            );
        })
    }

    create(token: Token): Promise<Token> {
        return new Promise((resolve, reject) => {
            this.tokens.push(token);
            resolve(token);
        })
    }

    getAll(): Promise<Token[]> {
        return new Promise((resolve, reject) => {
            resolve(this.tokens);
        })
    }
    getByUuid(uuid: string): Promise<Token> {
        return new Promise((resolve, reject) => {
            resolve(this.tokens.find((token) => token.uuid === uuid));
        })
    }

    getAllByUser(userUuid: string): Promise<Token[]> {
        return new Promise((resolve, reject) => {
            resolve(this.tokens.filter((token) => token.owner.uuid === userUuid));
        })
    }

    getAllForSale(): Promise<Token[]> {
        return new Promise((resolve, reject) => {
            resolve(this.tokens.filter((token) => token.status == TokenStatus.FOR_SALE));
        })
    }

    getAllForExchange(): Promise<Token[]> {
        return new Promise((resolve, reject) => {
            resolve(this.tokens.filter((token) => token.status == TokenStatus.FOR_EXCHANGE));
        })
    }
}