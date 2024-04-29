import { injectable, inject } from "inversify";
import { IComicService } from "../interfaces/i.comic.service";
import { IComicRepository } from "../interfaces/i.comic.repository";
import { UpdateResult, DeleteResult } from "typeorm";
import { Comic } from "../entities/comic.entity";
import { TYPES } from "../../api/util/di/di-types";

@injectable()
export class ComicService implements IComicService {
    private readonly _ComicRepository: IComicRepository;

    public constructor(@inject(TYPES.IComicRepository) ComicRepository: IComicRepository) {
        this._ComicRepository = ComicRepository;
    }

    create(user: Comic): Promise<Comic> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<Comic[]> {
        throw new Error("Method not implemented.");
    }

    getByUuid(uuid: string): Promise<Comic> {
        throw new Error("Method not implemented.");
    }

    update(Comic: Comic): Promise<UpdateResult> {
        throw new Error("Method not implemented.");
    }

    delete(uuid: string): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
}