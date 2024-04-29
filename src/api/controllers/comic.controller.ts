import { FastifyReply, FastifyRequest } from "fastify";
import { IComicController } from "../interfaces/i.comic.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { IComicService } from "../../domain/interfaces/i.comic.service";

@injectable()
export class ComicController implements IComicController {

    private readonly _ComicService: IComicService;

    public constructor(@inject(TYPES.IComicService) ComicService: IComicService) {
        this._ComicService = ComicService;
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