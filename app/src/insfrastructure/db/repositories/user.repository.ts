import { Repository } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../db/data-source";

export class UserRepository {
    private _databaseRepository: Repository<User>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(User);
    }

    public create = async (user: User): Promise<User> => {
        return await this._databaseRepository.save(user);
    }

    public async findByEmail(email: string): Promise<User> {
        return await this._databaseRepository.findOneBy({ email: email });
    }
}