import { injectable, inject } from "inversify";
import { ICreatorService } from "../interfaces/i.creator.service";
import { ICreatorRepository } from "../interfaces/i.creator.repository";
import { UpdateResult, DeleteResult } from "typeorm";
import { Creator } from "../entities/creator.entity";
import { TYPES } from "../../api/util/di/di-types";
import { ConflictException } from "../exceptions/conflict.exception";

@injectable()
export class CreatorService implements ICreatorService {
    private readonly _creatorRepository: ICreatorRepository;

    public constructor(@inject(TYPES.ICreatorRepository) creatorRepository: ICreatorRepository) {
        this._creatorRepository = creatorRepository;

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getByUuid = this.getByUuid.bind(this);
    }

    public async create(creator: Creator): Promise<Creator> {
        const fullNameCreator = this._creatorRepository.getByFullName(creator.fullName);
        if (fullNameCreator) throw new ConflictException("There is already a creator with this name");

        const sufixCreator = this._creatorRepository.getBySufix(creator.sufix);
        if (sufixCreator) throw new ConflictException("There is already a creator with this sufix");

        return await this._creatorRepository.create(creator);
    }

    public async getAll(): Promise<Creator[]> {
        return await this._creatorRepository.getAll();
    }

    public async getByUuid(uuid: string): Promise<Creator> {
        return await this._creatorRepository.getByUuid(uuid);
    }

    public async update(creator: Creator): Promise<UpdateResult> {
        return await this._creatorRepository.update(creator);
    }

    public async delete(uuid: string): Promise<DeleteResult> {
        return await this._creatorRepository.delete(uuid);
    }
}