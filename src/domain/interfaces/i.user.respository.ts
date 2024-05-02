import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByUuid(uuid: string): Promise<User>;
    increaseBalance(uuid: string, value: number): Promise<void>;
    decreaseBalance(uuid: string, value: number): Promise<void>;
}