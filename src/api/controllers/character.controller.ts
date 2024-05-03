import { FastifyReply, FastifyRequest } from "fastify";
import { ICharacterController } from "../interfaces/i.character.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { ICharacterService } from "../../domain/interfaces/i.character.service";
import { Character } from "../../domain/entities/character.entity";

@injectable()
export class CharacterController implements ICharacterController {

    private readonly _characterService: ICharacterService;

    public constructor(@inject(TYPES.ICharacterService) characterService: ICharacterService) {
        this._characterService = characterService;

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const characters = await this._characterService.getAll();
        return reply.send(characters);
    }

    public async getById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const character = this._characterService.getByUuid(request.params['uuid']);
        return reply.send(character);
    }

    public async update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._characterService.update(request.body as Character);
        return reply.send(204);
    }

    public async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._characterService.delete(request.params['uuid']);
        return reply.send(204);
    }

    public async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const createdUser = await this._characterService.create(request.body as Character);
        return reply.status(201).send(createdUser);
    }
}