import { FastifyReply, FastifyRequest } from "fastify";
import { ICharacterController } from "../interfaces/i.character.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { ICharacterService } from "../../domain/interfaces/i.character.service";
import { Character } from "../../domain/entities/character.entity";
import { NotFoundException } from "../../domain/exceptions/not-found.exception";

@injectable()
export class CharacterController implements ICharacterController {

    private readonly _characterService: ICharacterService;

    public constructor(@inject(TYPES.ICharacterService) characterService: ICharacterService) {
        this._characterService = characterService;

        this.getAll = this.getAll.bind(this);
        this.getByUuid = this.getByUuid.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const characters = await this._characterService.getAll();
        return reply.send(characters);
    }

    public async getByUuid(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const character = await this._characterService.getByUuid(request.params['uuid']);

        if (!character) throw new NotFoundException("The specified character was not found");
        
        return reply.send(character);
    }

    public async update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const character = request.body as Character;
        character.uuid = request.params['uuid'];
        await this._characterService.update(character);
        return reply.send("Character updated with success");
    }

    public async delete(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        await this._characterService.delete(request.params['uuid']);
        return reply.send("Character deleted with success");
    }

    public async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const createdUser = await this._characterService.create(request.body as Character);
        return reply.status(201).send(createdUser);
    }
}