import { User } from "../entities/user.entity";

export interface IAuthService {
    signup(user: User): Promise<User>;
    signin(user: User): Promise<string>;
}