import { injectable, inject } from "inversify";
import { ICharacterService } from "../interfaces/i.character.service";
import { ICharacterRepository } from "../interfaces/i.character.repository";
import { UpdateResult, DeleteResult } from "typeorm";
import { Character } from "../entities/character.entity";
import { TYPES } from "../../api/util/di/di-types";
import { ConflictException } from "../exceptions/conflict.exception";

@injectable()
export class CharacterService implements ICharacterService {
    private readonly _characterRepository: ICharacterRepository;

    public constructor(@inject(TYPES.ICharacterRepository) characterRepository: ICharacterRepository) {
        this._characterRepository = characterRepository;

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getByUuid = this.getByUuid.bind(this);
    }

    public async create(character: Character): Promise<Character> {
        const existsCharacter = this._characterRepository.getByName(character.name);
        if (existsCharacter) throw new ConflictException("There is already a character with this name");
        
        return await this._characterRepository.create(character);
    }

    public async getAll(): Promise<Character[]> {
        return await this._characterRepository.getAll();
    }

    public async getByUuid(uuid: string): Promise<Character> {
        return await this._characterRepository.getByUuid(uuid);
    }

    public async update(character: Character): Promise<UpdateResult> {
        return await this._characterRepository.update(character);
    }

    public async delete(uuid: string): Promise<DeleteResult> {
        return await this._characterRepository.delete(uuid);
    }
}