import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Comic } from "../../../domain/entities/comic.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { IComicRepository } from "../../../domain/interfaces/i.comic.repository";

@injectable()
export class ComicRepository implements IComicRepository {
    private _databaseRepository: Repository<Comic>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Comic);
    }

    public async create(Comic: Comic): Promise<Comic> {
        return await this._databaseRepository.save(Comic);
    }
    
    public async getByUuid(uuid: string): Promise<Comic> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }

    public async getAll(): Promise<Comic[]> {
        return await this._databaseRepository.find();
    }

    public async delete(uuid: string): Promise<DeleteResult> {
        return await this._databaseRepository.delete(uuid);
    }

    public async update(Comic: Comic): Promise<UpdateResult> {
        return await this._databaseRepository.update(Comic.uuid, Comic);
    }
}