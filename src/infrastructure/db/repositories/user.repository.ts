import { QueryFailedError, Repository } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../data-source"
import { IUserRepository } from "../../../domain/interfaces/i.user.respository";
import { injectable } from "inversify";
import { UnprocessableEntityException } from "../../../domain/exceptions/unprocessable-entity.exception";

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
        try {
            return await this._databaseRepository.save(user);
        } catch(error) {
            if (error instanceof QueryFailedError && error.driverError === '23503') {
                throw new UnprocessableEntityException("The user preferences don't match with registered values");
            }
        }
    }

    public async findByEmail(email: string): Promise<User> {
        return await this._databaseRepository.findOneBy({ email: email });
    }

    public async increaseBalance(uuid: string, value: number): Promise<void> {
        const user =  await this.findByUuid(uuid);
        user.balance + value;
        await this._databaseRepository.save(user);
    }

    public async decreaseBalance(uuid: string, value: number): Promise<void> {
        const user =  await this.findByUuid(uuid);
        user.balance - value;
        await this._databaseRepository.save(user);
    }
}