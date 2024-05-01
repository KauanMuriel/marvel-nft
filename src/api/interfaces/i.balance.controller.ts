import { FastifyReply, FastifyRequest } from "fastify";

export interface IBalanceController {
    get(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    withdraw(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    deposit(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}