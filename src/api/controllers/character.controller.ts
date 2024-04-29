import { FastifyReply, FastifyRequest } from "fastify";
import { ICharacterController } from "../interfaces/i.character.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "../util/di/di-types";
import { ICharacterService } from "../../domain/interfaces/i.character.service";

@injectable()
export class CharacterController implements ICharacterController {

    private readonly _CharacterService: ICharacterService;

    public constructor(@inject(TYPES.ICharacterService) CharacterService: ICharacterService) {
        this._CharacterService = CharacterService;
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