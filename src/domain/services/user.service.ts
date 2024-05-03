import "reflect-metadata"
import { User } from "../entities/user.entity";
import { ConflictException } from "../exceptions/conflict.exception";
import { IUserService } from "../interfaces/i.user.service";
import { IUserRepository } from "../interfaces/i.user.respository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../api/util/di/di-types";
import { BadRequestException } from "../exceptions/bad-request.exception";

@injectable()
export class UserService implements IUserService {
    private readonly _userRepository: IUserRepository;

    public constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;

        this.create = this.create.bind(this);
        this.getByUuid = this.getByUuid.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.increaseBalance = this.increaseBalance.bind(this);
        this.decreaseBalance = this.decreaseBalance.bind(this);
    }

    public async create(user: User): Promise<User> {
        const existsUser = await this.getByEmail(user.email);

        if (existsUser && existsUser !== null) {
            throw new ConflictException("There is already a user with this email");
        }

        return await this._userRepository.create(user);
    }

    public async getByEmail(email: string): Promise<User> {
        return await this._userRepository.findByEmail(email);
    }

    public async getByUuid(uuid: string): Promise<User> {
        return await this._userRepository.findByUuid(uuid);
    }

    public async increaseBalance(uuid: string, value: number): Promise<void> {
        if (value == 0){ throw new BadRequestException("Increase value cannot be zero.")};
        if (value < 0){ throw new BadRequestException("Increase value must be positive.")};

        await this._userRepository.increaseBalance(uuid, value);
    }

    public async decreaseBalance(uuid: string, value: number): Promise<void> {
        if (value == 0){ throw new BadRequestException("Decrease value cannot be zero.")};
        if (value < 0){ throw new BadRequestException("Decrease value must be positive.")};

        const user = await this.getByUuid(uuid);
        if (value > user.balance){ throw new BadRequestException("Insufficient funds")};

        await this._userRepository.decreaseBalance(uuid, value);
    }
}