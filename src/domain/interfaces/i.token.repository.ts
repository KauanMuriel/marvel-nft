import { Token } from "../entities/token.entity";

export interface ITokenRepository {
    create(token: Token): Promise<Token>;
    getAll(): Promise<Token[]>;
    getByUuid(uuid: string): Promise<Token>;
    getAllByUser(userUuid: string): Promise<Token[]>
}