import { DeleteResult, UpdateResult } from "typeorm";
import { Comic } from "../entities/comic.entity";

export interface IComicService {
    create(user: Comic): Promise<Comic>;
    getAll(): Promise<Comic[]>;
    getByUuid(uuid: string): Promise<Comic>;
    update(Comic: Comic): Promise<UpdateResult>;
    delete(uuid: string): Promise<DeleteResult>;
}