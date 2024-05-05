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
    create(comic: Comic): Promise<Comic> {
        return new Promise((resolve, reject) => {
            this.comics.push(comic);
            resolve(null);
        })
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
        return new Promise((resolve, reject) => {
            resolve(this.comics.find((comic) => comic.isbn === isbn));
        })
    }
    update(comic: Comic): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.comics.findIndex((comic) => comic.uuid === comic.uuid);
            this.comics[index] = comic;
            resolve(null);
        })
    }
    delete(uuid: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.comics.findIndex((comic) => comic.uuid === uuid);
            this.comics.splice(index, 1);
            resolve(null);
        })
    }
}