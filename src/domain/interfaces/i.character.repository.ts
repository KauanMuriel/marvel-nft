import { Character } from "../entities/character.entity";

export interface ICharacterRepository {
    create(Character: Character): Promise<Character>;
    getAll(): Promise<Character[]>;
    getByUuid(uuid: string): Promise<Character>;
    getByName(name: string): Promise<Character>;
    update(character: Character): Promise<void>;
    delete(uuid: string): Promise<void>;
}