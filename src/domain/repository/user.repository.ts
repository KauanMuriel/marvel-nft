import { QueryFailedError, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../data-source";

export class UserRepository {
    private _databaseRepository: Repository<User>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(User);
    }

    public create = async (user: User): Promise<User> => {
        try {
            return await this._databaseRepository.save(user);
        } catch(error) {
            if (error.code === '23505') {
                
            }
        }
    }
}