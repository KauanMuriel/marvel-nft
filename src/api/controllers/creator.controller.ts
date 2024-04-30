import { FastifyReply, FastifyRequest } from "fastify";
import { ICreatorController } from "../interfaces/i.creator.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { ICreatorService } from "../../domain/interfaces/i.creator.service";
import { Creator } from "../../domain/entities/creator.entity";

@injectable()
export class CreatorController implements ICreatorController {

    private readonly _creatorService: ICreatorService;

    public constructor(@inject(TYPES.ICreatorService) creatorService: ICreatorService) {
        this._creatorService = creatorService;
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const creators = await this._creatorService.getAll();
        return reply.send(creators);
    }
    
    public async getById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const creator = await this._creatorService.getByUuid(request.params['uuid']);
        return reply.send(creator);
    }

    public async update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._creatorService.update(request.body as Creator);
        return reply.status(204);
    }
    
    public async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._creatorService.delete(request.params['uuid']);
        return reply.status(204);
    }

    public async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const createdCreator = await this._creatorService.create(request.body as Creator);
        return reply.send(createdCreator);
    }
}