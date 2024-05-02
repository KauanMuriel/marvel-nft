import { User } from "../entities/user.entity";

export interface IBalanceService {
    get(uuid: string): Promise<number>;
    withdraw(uuid: string, value: number): Promise<void>;
    deposit(uuid: string, value: number): Promise<void>;
}