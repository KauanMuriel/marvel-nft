import { User } from "../entities/user.entity";
import { ConflictException } from "../exceptions/conflict.exception";
import { IUserService } from "../interfaces/i.user.service";
import { IUserRepository } from "../interfaces/i.user.respository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../api/util/di/di-types";

@injectable()
export class UserService implements IUserService {
    private readonly _userRepository: IUserRepository;

    public constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;

        this.create = this.create.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
    }

    public async create(user: User): Promise<User> {
        const existsUser = await this.getByEmail(user.email);

        if (existsUser !== null) {
            throw new ConflictException("There is already a user with this email");
        }

        return await this._userRepository.create(user);
    }

    public async getByEmail(email: string): Promise<User> {
        return await this._userRepository.findByEmail(email);
    }
}