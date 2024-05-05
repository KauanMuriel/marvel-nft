import { injectable } from "inversify";
import { AppDataSource } from "../data-source";
import { Comic } from "../../../domain/entities/comic.entity";
import { Repository } from "typeorm";
import { IComicRepository } from "../../../domain/interfaces/i.comic.repository";
import { NotFoundException } from "../../../domain/exceptions/not-found.exception";

@injectable()
export class ComicRepository implements IComicRepository {
    private _databaseRepository: Repository<Comic>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Comic);
    }

    public async create(Comic: Comic): Promise<Comic> {
        return await this._databaseRepository.save(Comic);
    }

    public async getByIsbn(isbn: string): Promise<Comic> {
        return await this._databaseRepository.findOneBy({ isbn: isbn });
    }

    public async getByUuid(uuid: string): Promise<Comic> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }

    public async getAll(): Promise<Comic[]> {
        return await this._databaseRepository.find();
    }

    public async delete(uuid: string): Promise<void> {
        const result = await this._databaseRepository.delete(uuid);
        if (result.affected === 0) {
            throw new NotFoundException("There isn't a comic with this uuid");
        }
    }

    public async update(Comic: Comic): Promise<void> {
        const result = await this._databaseRepository.update(Comic.uuid, Comic);
        if (result.affected === 0) {
            throw new NotFoundException("There isn't a comic with this uuid");
        }
    }
}