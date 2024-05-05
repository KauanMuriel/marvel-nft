import { FastifyReply, FastifyRequest } from "fastify";

export interface IMarketplaceController {
    getForSale(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getForExchange(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    buyToken(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    sellToken(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}