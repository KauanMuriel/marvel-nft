import { inject, injectable } from "inversify";
import { IMarketplaceService } from "../interfaces/i.marketplace.service";
import { ITokenRepository } from "../interfaces/i.token.repository";
import { TYPES } from "../../api/util/di/di-types";
import { Token } from "../entities/token.entity";
import { TokenStatus } from "../enums/token-status";
import { BadRequestException } from "../exceptions/bad-request.exception";
import { IUserService } from "../interfaces/i.user.service";
import { User } from "../entities/user.entity";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { ConflictException } from "../exceptions/conflict.exception";

@injectable()
export class MarketplaceService implements IMarketplaceService {
    private readonly _tokenRepository: ITokenRepository;
    private readonly _userService: IUserService;

    public constructor(
    @inject(TYPES.ITokenRepository) tokenRepository: ITokenRepository,
    @inject(TYPES.IUserService) userService: IUserService) {
        this._tokenRepository = tokenRepository;
        this._userService = userService;
    }

    public async getTokensForSale(): Promise<Token[]> {
        return await this._tokenRepository.getAllForSale();
    }

    public async getTokensForExchange(): Promise<Token[]> {
        return await this._tokenRepository.getAllForExchange();
    }

    public async buyToken(tokenUuid: string, userUuid: string): Promise<Token> {
        const token = await this._tokenRepository.getByUuid(tokenUuid);
        
        if (token.status !== TokenStatus.FOR_SALE) {
            throw new BadRequestException("The nft token isn't for sale.");
        }

        await this._userService.decreaseBalance(userUuid, token.price);
        await this._userService.increaseBalance(token.owner.uuid, token.price);
        token.owner = { uuid: userUuid } as User;
        token.price = 0.0;
        token.status = TokenStatus.CLAIMED;
        await this._tokenRepository.update(token);
        return token;
    }

    public async sellToken(tokenUuid: string, price: number, userUuid: string): Promise<Token> {
        const token = await this._tokenRepository.getByUuid(tokenUuid);

        if (!token) {
            throw new BadRequestException("There isn't a token with this uuid");
        }

        if (token.owner.uuid !== userUuid) {
            throw new UnauthorizedException("The token isn't the user's to be sold");
        }

        if (token.status === TokenStatus.FOR_SALE) {
            throw new ConflictException("The token is already for sale");
        }

        token.status = TokenStatus.FOR_SALE;
        token.price = price;
        await this._tokenRepository.update(token);
        return token;
    }
}