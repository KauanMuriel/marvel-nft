import { FastifyReply, FastifyRequest } from "fastify";
import { ICreatorController } from "../interfaces/i.creator.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { ICreatorService } from "../../domain/interfaces/i.creator.service";

@injectable()
export class CreatorController implements ICreatorController {

    private readonly _creatorService: ICreatorService;

    public constructor(@inject(TYPES.ICreatorService) creatorService: ICreatorService) {
        this._creatorService = creatorService;
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        throw new Error("Method not implemented.");
    }
    
    public async getById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        throw new Error("Method not implemented.");
    }

    public async update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        throw new Error("Method not implemented.");
    }
    
    public async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        throw new Error("Method not implemented.");
    }

    public async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        throw new Error("Method not implemented.");
    }
}