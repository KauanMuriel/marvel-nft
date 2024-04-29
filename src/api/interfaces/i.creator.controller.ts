import { FastifyReply, FastifyRequest } from "fastify";

export interface ICreatorController {
    create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
}