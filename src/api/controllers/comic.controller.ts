import { FastifyReply, FastifyRequest } from "fastify";
import { IComicController } from "../interfaces/i.comic.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { IComicService } from "../../domain/interfaces/i.comic.service";
import { Comic } from "../../domain/entities/comic.entity";

@injectable()
export class ComicController implements IComicController {

    private readonly _comicService: IComicService;

    public constructor(@inject(TYPES.IComicService) ComicService: IComicService) {
        this._comicService = ComicService;

        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getById = this.getById.bind(this);
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const comics = await this._comicService.getAll();
        return reply.send(comics);
    }
    
    public async getById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const comic = await this._comicService.getByUuid(request.params['uuid'])
        return reply.send(comic);
    }

    public async update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        throw new Error("Method not implemented.");
    }
    
    public async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._comicService.delete(request.params['uuid']);
        return reply.send(204);
    }

    public async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const createdComic = await this._comicService.create(request.body as Comic);
        return reply.send(createdComic);
    }
}