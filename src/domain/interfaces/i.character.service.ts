import { Character } from "../entities/character.entity";

export interface ICharacterService {
    create(user: Character): Promise<Character>;
    getAll(): Promise<Character[]>;
    getByUuid(uuid: string): Promise<Character>;
    update(Character: Character): Promise<void>;
    delete(uuid: string): Promise<void>;
}