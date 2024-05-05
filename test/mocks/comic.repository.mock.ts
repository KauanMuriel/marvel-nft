import { injectable } from "inversify";
import { Comic } from "../../src/domain/entities/comic.entity";
import { IComicRepository } from "../../src/domain/interfaces/i.comic.repository";

@injectable()
export class ComicRepositoryMock implements IComicRepository {
    private readonly comics: Comic[];

    public constructor() {
        this.comics = [{
            uuid: "10908bca-734f-4c17-be24-22bd4db4b2eb",
            isbn: "978-1302923730",
            title: "Spider-Man #1",
            creator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec"
        }];
    }
    create(Comic: Comic): Promise<Comic> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Comic[]> {
        return new Promise((resolve, reject) => {
            resolve(this.comics);
        });
    }
    getByUuid(uuid: string): Promise<Comic> {
        return new Promise((resolve, reject) => {
            resolve(this.comics.find((comic) => comic.uuid === uuid));
        })
    }
    getByIsbn(isbn: string): Promise<Comic> {
        throw new Error("Method not implemented.");
    }
    update(Comic: Comic): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}