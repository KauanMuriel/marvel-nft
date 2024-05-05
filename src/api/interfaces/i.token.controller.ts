import { FastifyReply, FastifyRequest } from "fastify";

export interface ITokenController {
    mine(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getByUuid(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}