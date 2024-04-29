import { FastifyReply, FastifyRequest } from "fastify";

export interface IAuthController {
    signup(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    signin(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    logout(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}