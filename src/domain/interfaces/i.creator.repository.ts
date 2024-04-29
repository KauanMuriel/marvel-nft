import { Creator } from "../entities/creator.entity";

export interface ICreatorRepository {
    create(creator: Creator): Promise<Creator>;
    getAll(): Promise<Creator[]>;
    getByUuid(uuid: string): Promise<Creator>;
    update(creator: Creator);
    delete(uuid: string);
}