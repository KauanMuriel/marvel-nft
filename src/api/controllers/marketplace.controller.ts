import { inject, injectable } from "inversify";
import { IMarketplaceController } from "../interfaces/i.marketplace.controller";
import { FastifyRequest, FastifyReply } from "fastify";
import { IMarketplaceService } from "../../domain/interfaces/i.marketplace.service";
import { TYPES } from "../util/di/di-types";

@injectable()
export class MarketplaceController implements IMarketplaceController {
    private readonly _marketplaceService: IMarketplaceService;
    
    public constructor(@inject(TYPES.IMarketplaceService) marketplaceService: IMarketplaceService) {
        this._marketplaceService = marketplaceService;
    }

    public async getForSale(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const tokensForSale = await this._marketplaceService.getTokensForSale();
        return reply.send(tokensForSale);
    }

    public async getForExchange(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const tokensForExchange = await this._marketplaceService.getTokensForExchange();
        return reply.send(tokensForExchange);
    }
}