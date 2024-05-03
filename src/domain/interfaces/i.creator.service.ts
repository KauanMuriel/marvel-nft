import { DeleteResult, UpdateResult } from "typeorm";
import { Creator } from "../entities/creator.entity";

export interface ICreatorService {
    create(user: Creator): Promise<Creator>;
    getAll(): Promise<Creator[]>;
    getByUuid(uuid: string): Promise<Creator>;
    update(creator: Creator): Promise<UpdateResult>;
    delete(uuid: string): Promise<DeleteResult>;
}