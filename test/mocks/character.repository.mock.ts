import { injectable } from "inversify";
import { ICharacterRepository } from "../../src/domain/interfaces/i.character.repository";
import { Character } from "../../src/domain/entities/character.entity";

@injectable()
export class CharacterRepositoryMock implements ICharacterRepository {
    private readonly characters: Character[];

    public constructor() {
        this.characters = [{
            uuid: "ae430434-f3d5-492f-893a-78e110211a70",
            name: "Spider-Man",
            description: "A man who was bitten by a spider",
            thumbnail: "c3BpZGVybWFu"
        }];
    }

    public async create(character: Character): Promise<Character> {
        return new Promise((resolve, reject) => {
            resolve({ uuid: "4de9c6d0-c149-401f-a742-e70b98a629f7", ...character });
        });
    }
    
    public async getAll(): Promise<Character[]> {
        return new Promise((resolve, reject) => {
            resolve(this.characters);
        });
    }

    public async getByUuid(uuid: string): Promise<Character> {
        return new Promise((resolve, reject) => {
            resolve(this.characters.find((character) => character.uuid === uuid));
        });
    }
    public async getByName(name: string): Promise<Character> {
        return new Promise((resolve, reject) => {
            resolve(this.characters.find((character) => character.name === name));
        });
    }
    public async update(character: Character): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.characters.findIndex((charac) => charac.name === character.name);
            this.characters[index] = character;
            resolve(null);
        });
    }
    public async delete(uuid: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.characters.findIndex((character) => character.uuid === uuid);
            this.characters.splice(index, 1);
            resolve(null);
        });
    }

}