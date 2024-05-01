import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByUuid(uuid: string): Promise<User>;
    increaseBalance(user: User, value: number): Promise<void>;
    decreaseBalance(user: User, value: number): Promise<void>;
}