import { Creator } from "../entities/creator.entity";

export interface ICreatorService {
    create(user: Creator): Promise<Creator>;
    getAll(): Promise<Creator[]>;
    getByUuid(uuid: string): Promise<Creator>;
    update(creator: Creator): Promise<Creator>;
    delete(uuid: string): Promise<Creator>;
}