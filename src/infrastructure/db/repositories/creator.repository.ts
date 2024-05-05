import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Creator } from "../../../domain/entities/creator.entity";
import { Repository } from "typeorm";
import { ICreatorRepository } from "../../../domain/interfaces/i.creator.repository";
import { NotFoundException } from "../../../domain/exceptions/not-found.exception";

@injectable()
export class CreatorRepository implements ICreatorRepository {
    private _databaseRepository: Repository<Creator>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Creator);
    }

    public async create(creator: Creator): Promise<Creator> {
        return await this._databaseRepository.save(creator);
    }

    public async getByFullName(fullName: string): Promise<Creator> {
        return await this._databaseRepository.findOneBy({ fullName: fullName });
    }
    public async getBySufix(sufix: string): Promise<Creator> {
        return await this._databaseRepository.findOneBy({ sufix: sufix });
    }

    public async getByUuid(uuid: string): Promise<Creator> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }

    public async getAll(): Promise<Creator[]> {
        return await this._databaseRepository.find();
    }

    public async delete(uuid: string): Promise<void> {
        const result = await this._databaseRepository.delete(uuid);
        if (result.affected === 0) {
            throw new NotFoundException("There isn't a creator with this uuid");
        }
    }

    public async update(creator: Creator): Promise<void> {
        const result =  await this._databaseRepository.update(creator.uuid, creator);
        if (result.affected === 0) {
            throw new NotFoundException("There isn't a creator with this uuid");
        }
    }
}