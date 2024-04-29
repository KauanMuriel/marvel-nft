import { Comic } from "../entities/comic.entity";

export interface IComicRepository {
    create(Comic: Comic): Promise<Comic>;
    getAll(): Promise<Comic[]>;
    getByUuid(uuid: string): Promise<Comic>;
    update(Comic: Comic);
    delete(uuid: string);
}