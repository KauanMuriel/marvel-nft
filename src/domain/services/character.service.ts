import { injectable, inject } from "inversify";
import { ICharacterService } from "../interfaces/i.character.service";
import { ICharacterRepository } from "../interfaces/i.character.repository";
import { UpdateResult, DeleteResult } from "typeorm";
import { Character } from "../entities/character.entity";
import { TYPES } from "../../api/util/di/di-types";

@injectable()
export class CharacterService implements ICharacterService {
    private readonly _CharacterRepository: ICharacterRepository;

    public constructor(@inject(TYPES.ICharacterRepository) CharacterRepository: ICharacterRepository) {
        this._CharacterRepository = CharacterRepository;
    }

    create(user: Character): Promise<Character> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<Character[]> {
        throw new Error("Method not implemented.");
    }

    getByUuid(uuid: string): Promise<Character> {
        throw new Error("Method not implemented.");
    }

    update(Character: Character): Promise<UpdateResult> {
        throw new Error("Method not implemented.");
    }

    delete(uuid: string): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
}