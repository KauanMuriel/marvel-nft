import { injectable, inject } from "inversify";
import { ICreatorService } from "../interfaces/i.creator.service";
import { ICreatorRepository } from "../interfaces/i.creator.repository";
import { UpdateResult, DeleteResult } from "typeorm";
import { Creator } from "../entities/creator.entity";
import { TYPES } from "../../api/util/di/di-types";

@injectable()
export class CreatorService implements ICreatorService {
    private readonly _creatorRepository: ICreatorRepository;

    public constructor(@inject(TYPES.ICreatorRepository) creatorRepository: ICreatorRepository) {
        this._creatorRepository = creatorRepository;
    }

    create(user: Creator): Promise<Creator> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<Creator[]> {
        throw new Error("Method not implemented.");
    }

    getByUuid(uuid: string): Promise<Creator> {
        throw new Error("Method not implemented.");
    }

    update(creator: Creator): Promise<UpdateResult> {
        throw new Error("Method not implemented.");
    }

    delete(uuid: string): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
}