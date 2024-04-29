import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Creator } from "../../../domain/entities/creator.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ICreatorRepository } from "../../../domain/interfaces/i.creator.repository";

@injectable()
export class CreatorRepository implements ICreatorRepository {
    private _databaseRepository: Repository<Creator>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Creator);
    }

    public async create(creator: Creator): Promise<Creator> {
        return await this._databaseRepository.save(creator);
    }
    
    public async getByUuid(uuid: string): Promise<Creator> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }

    public async getAll(): Promise<Creator[]> {
        return await this._databaseRepository.find();
    }

    public async delete(uuid: string): Promise<DeleteResult> {
        return await this._databaseRepository.delete(uuid);
    }

    public async update(creator: Creator): Promise<UpdateResult> {
        return await this._databaseRepository.update(creator.uuid, creator);
    }
}