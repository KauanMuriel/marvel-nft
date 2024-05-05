import { injectable, inject } from "inversify";
import { IComicService } from "../interfaces/i.comic.service";
import { IComicRepository } from "../interfaces/i.comic.repository";
import { Comic } from "../entities/comic.entity";
import { TYPES } from "../../api/util/di/di-types";
import { ConflictException } from "../exceptions/conflict.exception";

@injectable()
export class ComicService implements IComicService {
    private readonly _comicRepository: IComicRepository;

    public constructor(@inject(TYPES.IComicRepository) comicRepository: IComicRepository) {
        this._comicRepository = comicRepository;

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.delete = this.delete.bind(this);
        this.getByUuid = this.getByUuid.bind(this);
    }

    public async create(comic: Comic): Promise<Comic> {
        const existsComic = await this._comicRepository.getByIsbn(comic.isbn);
        if (existsComic) throw new ConflictException("There is already a comic with this isbn");

        return await this._comicRepository.create(comic);
    }

    public async getAll(): Promise<Comic[]> {
        return await this._comicRepository.getAll();
    }

    public async getByUuid(uuid: string): Promise<Comic> {
        return await this._comicRepository.getByUuid(uuid);
    }

    public async update(comic: Comic): Promise<void> {
        await this._comicRepository.update(comic);
    }

    public async delete(uuid: string): Promise<void> {
        await this._comicRepository.delete(uuid);
    }
}