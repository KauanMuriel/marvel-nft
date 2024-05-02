import { User } from "../entities/user.entity";

export interface IAuthService {
    signup(user: User): Promise<User>;
    signin(stranger: User): Promise<string>;
    validateTokenCredentials(userUuid: string, password: string): Promise<void>;
}