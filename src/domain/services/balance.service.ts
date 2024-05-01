import { injectable, inject } from "inversify";
import { ICharacterService } from "../interfaces/i.character.service";
import { ICharacterRepository } from "../interfaces/i.character.repository";
import { Character } from "../entities/character.entity";
import { TYPES } from "../../api/util/di/di-types";
import { ConflictException } from "../exceptions/conflict.exception";
import { IBalanceService } from "../interfaces/i.balance.service";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";
import { IUserService } from "../interfaces/i.user.service";

@injectable()
export class BalanceService implements IBalanceService {
    private readonly _userService: IUserService

    public constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this._userService = userService;

        this.get = this.get.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.deposit = this.deposit.bind(this);
    }

    public async get(user: User): Promise<number> {
        const balance = user.balance
        return balance
    }

    public async withdraw(user: User, value: number): Promise<void> {
        await this._userService.increaseBalance(user, value);
    }

    public async deposit(user: User, value: number): Promise<void> {
        await this._userService.decreaseBalance(user, value);
    }
}