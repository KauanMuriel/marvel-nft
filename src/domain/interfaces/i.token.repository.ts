import { Token } from "../entities/token.entity";
import { ContentType } from "../enums/content-type";

export interface ITokenRepository {
    create(token: Token): Promise<Token>;
    getAll(): Promise<Token[]>;
    getAllByUser(userUuid: string): Promise<Token[]>;
    getAllForSale(): Promise<Token[]>;
    getAllForExchange(): Promise<Token[]>;
    getByUuid(uuid: string): Promise<Token>;
    getByContent(contentId: string, contentType: ContentType): Promise<Token>;
    update(token: Token): Promise<void>;
}