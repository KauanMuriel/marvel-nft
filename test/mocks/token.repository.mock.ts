import { injectable } from "inversify";
import { Token } from "../../src/domain/entities/token.entity";
import { ContentType } from "../../src/domain/enums/content-type";
import { ITokenRepository } from "../../src/domain/interfaces/i.token.repository";

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
        this.tokens = [{
            uuid: "9bb3e71b-179d-4b8f-9fcf-360a3ad211ce",
            owner: "ae430434-f3d5-492f-893a-78e110211a70",
            contentType: ContentType.COMICS,
            contentData: dataJson
        }]
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
            resolve(this.tokens.filter((token) => token.owner === userUuid));
        })
    }
}