import { FastifyReply, FastifyRequest } from "fastify";

export interface IComicController {
    create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getByUuid(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}