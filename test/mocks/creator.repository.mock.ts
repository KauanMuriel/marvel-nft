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
        return new Promise((resolve, reject) => {
            this.creators.push(creator);
            resolve(null);
        })
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
        return new Promise((resolve, reject) => {
            resolve(this.creators.find((creator) => creator.fullName === fullName));
        });
    }
    getBySufix(sufix: string): Promise<Creator> {
        return new Promise((resolve, reject) => {
            resolve(this.creators.find((creator) => creator.sufix === sufix));
        });
    }
    update(creator: Creator): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.creators.findIndex((comic) => comic.uuid === comic.uuid);
            this.creators[index] = creator;
            resolve(null);
        })
    }
    delete(uuid: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.creators.findIndex((comic) => comic.uuid === uuid);
            this.creators.splice(index, 1);
            resolve(null);
        })
    }
}