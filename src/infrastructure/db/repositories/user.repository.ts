import { Repository } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../data-source"
import { IUserRepository } from "../../../domain/interfaces/i.user.respository";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
    private _databaseRepository: Repository<User>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(User);
    }
    public async findByUuid(uuid: string): Promise<User> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }

    public async create(user: User): Promise<User> {
        return await this._databaseRepository.save(user);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this._databaseRepository.findOneBy({ email: email });
    }
}