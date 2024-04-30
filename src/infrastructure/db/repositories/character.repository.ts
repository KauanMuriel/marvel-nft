import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Character } from "../../../domain/entities/character.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ICharacterRepository } from "../../../domain/interfaces/i.character.repository";

@injectable()
export class CharacterRepository implements ICharacterRepository {
    private _databaseRepository: Repository<Character>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Character);
    }

    public async create(Character: Character): Promise<Character> {
        return await this._databaseRepository.save(Character);
    }

    public async getByName(name: string): Promise<Character> {
        return await this._databaseRepository.findOneBy({ name: name });
    }

    public async getByUuid(uuid: string): Promise<Character> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }

    public async getAll(): Promise<Character[]> {
        return await this._databaseRepository.find();
    }

    public async delete(uuid: string): Promise<void> {
        await this._databaseRepository.delete(uuid);
    }

    public async update(Character: Character): Promise<void> {
        await this._databaseRepository.update(Character.uuid, Character);
    }
}