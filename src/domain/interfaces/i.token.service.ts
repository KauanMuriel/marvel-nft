import { Token } from "../entities/token.entity";

export interface ITokenService {
    mine(userUuid: string): Promise<Token>;
    getAll(): Promise<Token[]>;
}