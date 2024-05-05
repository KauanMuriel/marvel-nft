import { Token } from "../entities/token.entity";

export interface IMarketplaceService {
    getTokensForSale(): Promise<Token[]>;
    getTokensForExchange(): Promise<Token[]>;
}