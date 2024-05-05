import { Token } from "../entities/token.entity";

export interface IMarketplaceService {
    getTokensForSale(): Promise<Token[]>;
    getTokensForExchange(): Promise<Token[]>;
    buyToken(tokenUuid: string, userUuid: string): Promise<Token>;
    sellToken(tokenUuid: string, price: number, userUuid: string): Promise<Token>;
}