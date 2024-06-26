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

        this.getAll = this.getAll.bind(this);
        this.getByUuid = this.getByUuid.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const creators = await this._creatorService.getAll();
        return reply.send(creators);
    }
    
    public async getByUuid(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const creator = await this._creatorService.getByUuid(request.params['uuid']);
        return reply.send(creator);
    }

    public async update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const creator = request.body as Creator;
        creator.uuid = request.params['uuid']; 
        await this._creatorService.update(creator);
        return reply.send("Creator updated with success");
    }
    
    public async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._creatorService.delete(request.params['uuid']);
        return reply.send("Creator deleted with success");
    }

    public async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const createdCreator = await this._creatorService.create(request.body as Creator);
        return reply.send(createdCreator);
    }
}