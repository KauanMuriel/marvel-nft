import { inject, injectable } from "inversify";
import { IMarketplaceController } from "../interfaces/i.marketplace.controller";
import { FastifyRequest, FastifyReply } from "fastify";
import { IMarketplaceService } from "../../domain/interfaces/i.marketplace.service";
import { TYPES } from "../util/di/di-types";
import { JWTHelper } from "../util/jwt";
import { Token } from "../../domain/entities/token.entity";

@injectable()
export class MarketplaceController implements IMarketplaceController {
    private readonly _marketplaceService: IMarketplaceService;
    
    public constructor(@inject(TYPES.IMarketplaceService) marketplaceService: IMarketplaceService) {
        this._marketplaceService = marketplaceService;

        this.buyToken = this.buyToken.bind(this);
        this.getForSale = this.getForSale.bind(this);
        this.getForExchange = this.getForExchange.bind(this);
    }

    public async getForSale(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const tokensForSale = await this._marketplaceService.getTokensForSale();
        return reply.send(tokensForSale);
    }

    public async getForExchange(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const tokensForExchange = await this._marketplaceService.getTokensForExchange();
        return reply.send(tokensForExchange);
    }

    public async buyToken(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const jwt = JWTHelper.getJWTFromRequest(request);
        const { uuid } = JWTHelper.decodeToken(jwt);
        const updatedToken = await this._marketplaceService.buyToken(request.body['uuid'], uuid);
        return reply.send(updatedToken);
    }

    public async sellToken(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const jwt = JWTHelper.getJWTFromRequest(request);
        const { uuid } = JWTHelper.decodeToken(jwt);
        const tokenToBeForSale = request.body as Token;
        const updatedToken = await this._marketplaceService.sellToken(tokenToBeForSale.uuid, tokenToBeForSale.price, uuid);
        return reply.send(updatedToken);
    }
}