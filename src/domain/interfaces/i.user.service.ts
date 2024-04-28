import { User } from "../entities/user.entity";

export interface IUserService {
    create(user: User): Promise<User>;
    getByEmail(email: string): Promise<User>;
}