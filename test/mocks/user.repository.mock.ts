import { inject, injectable } from "inversify";
import { User } from "../../src/domain/entities/user.entity";
import { IUserRepository } from "../../src/domain/interfaces/i.user.respository";
import { ICreatorRepository } from "../../src/domain/interfaces/i.creator.repository";
import { ICharacterRepository } from "../../src/domain/interfaces/i.character.repository";
import { IComicRepository } from "../../src/domain/interfaces/i.comic.repository";
import { TYPES } from "../../src/api/util/di/di-types";
import { UnprocessableEntityException } from "../../src/domain/exceptions/unprocessable-entity.exception";

@injectable()
export class UserRepositoryMock implements IUserRepository {
    private readonly _creatorRepository: ICreatorRepository;
    private readonly _characterRepository: ICharacterRepository;
    private readonly _comicRepository: IComicRepository;

    public users: User[] = [];

    public constructor(
        @inject(TYPES.ICharacterRepository) characterRepository: ICharacterRepository,
        @inject(TYPES.IComicRepository) comicRepository: IComicRepository,
        @inject(TYPES.ICreatorRepository) creatorRepository: ICreatorRepository) {
        this._characterRepository = characterRepository;
        this._comicRepository = comicRepository;
        this._creatorRepository = creatorRepository;
        this.users = [{
            uuid: "ae430434-f3d5-492f-893a-78e110211a70",
            username: "kauan.rossi",
            password: "testing123",
            email: "testing.br@email.com",
            balance: 100,
            admin: true
        } as User];
    }

    public async create(user: User): Promise<User> {
        return new Promise(async (resolve, reject) => {
            const creator = await this._creatorRepository.getByUuid(user.favoriteCreator);
            const comic = await this._comicRepository.getByUuid(user.favoriteComic);
            const character = await this._characterRepository.getByUuid(user.favoriteCharacter);
            if (creator && comic && character) {
                resolve({ uuid: "4de9c6d0-c149-401f-a742-e70b98a629f7", ...user });
            } else {
                reject(new UnprocessableEntityException("The user preferences don't match with registered values"));
            }
        });
    }

    public async findByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.users.find((user) => user.email === email));
        });
    }

    public async findByUuid(uuid: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.users.find((user) => user.uuid === uuid));
        })
    }

    public async getBalance(uuid: string): Promise<number>{
        return new Promise((resolve, reject) => {
            const searchedUserIndex = this.users.findIndex((user) => user.uuid == uuid);
            resolve(this.users[searchedUserIndex].balance);
        })
    }

    public async increaseBalance(uuid: string, value: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const searchedUserIndex = this.users.findIndex((user) => user.uuid == uuid);
            this.users[searchedUserIndex].balance + value;
            resolve()
        });
    }

    public async decreaseBalance(uuid: string, value: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const searchedUserIndex = this.users.findIndex((user) => user.uuid == uuid);
            this.users[searchedUserIndex].balance - value;
            resolve()
        });
    }
}