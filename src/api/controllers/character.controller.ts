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
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const characters = await this._characterService.getAll();
        return reply.send(characters);
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
        const createdUser = await this._characterService.create(request.body as Character);
        return reply.send(createdUser);
    }
}