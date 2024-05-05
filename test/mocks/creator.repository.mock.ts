import { injectable } from "inversify";
import { Creator } from "../../src/domain/entities/creator.entity";
import { ICreatorRepository } from "../../src/domain/interfaces/i.creator.repository";

@injectable()
export class CreatorRepositoryMock implements ICreatorRepository {
    private readonly creators: Creator[];

    public constructor() {
        this.creators = [{
            fullName: "Stanley Martin Lieber",
            sufix: "Stan Lee",
            uuid: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec",
            thumbnail: "c3BpZGVybWFu"
        }];
    }

    create(creator: Creator): Promise<Creator> {
        throw new Error("Method not implemented.");
    }
    
    getAll(): Promise<Creator[]> {
        return new Promise((resolve, reject) => {
            resolve(this.creators)
        });
    }

    getByUuid(uuid: string): Promise<Creator> {
        return new Promise((resolve, reject) => {
            resolve(this.creators.find((creator) => creator.uuid === uuid));
        });
    }
    getByFullName(fullName: string): Promise<Creator> {
        throw new Error("Method not implemented.");
    }
    getBySufix(sufix: string): Promise<Creator> {
        throw new Error("Method not implemented.");
    }
    update(creator: Creator): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}