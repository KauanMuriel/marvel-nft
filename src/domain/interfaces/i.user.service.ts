import { User } from "../entities/user.entity";

export interface IUserService {
    create(user: User): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByUuid(uuid: string): Promise<User>;
    increaseBalance(uuid: string, value: number): Promise<void>;
    decreaseBalance(uuid: string, value: number): Promise<void>;
}