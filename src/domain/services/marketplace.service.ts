import { inject, injectable } from "inversify";
import { IMarketplaceService } from "../interfaces/i.marketplace.service";
import { ITokenRepository } from "../interfaces/i.token.repository";
import { TYPES } from "../../api/util/di/di-types";
import { Token } from "../entities/token.entity";

@injectable()
export class MarketplaceService implements IMarketplaceService {
    private readonly _tokenRepository: ITokenRepository;

    public constructor(@inject(TYPES.ITokenRepository) tokenRepository: ITokenRepository) {
        this._tokenRepository = tokenRepository;
    }
    public async getTokensForSale(): Promise<Token[]> {
        return await this._tokenRepository.getAllForSale();
    }

    public async getTokensForExchange(): Promise<Token[]> {
        return await this._tokenRepository.getAllForExchange();
    }
}