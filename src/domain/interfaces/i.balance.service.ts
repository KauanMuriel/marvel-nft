import { User } from "../entities/user.entity";

export interface IBalanceService {
    get(user: User): Promise<number>;
    withdraw(user: User, value: number): Promise<void>;
    deposit(user: User, value: number): Promise<void>;
}