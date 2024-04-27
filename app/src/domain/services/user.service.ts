import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../insfrastructure/db/repositories/user.repository"
import { ConflictException } from "../exceptions/conflict.exception";

export class UserService {
    private readonly _userRepository: UserRepository;

    public constructor() {
        this._userRepository = new UserRepository();

        this.create = this.create.bind(this);
    }

    public async create(user: User): Promise<User> {
        const existsUser = await this.getByEmail(user.email);

        if (existsUser !== null) {
            throw new ConflictException("There is already a user with this email");
        }

        return await this._userRepository.create(user);
    }

    public async getByEmail(email: string): Promise<User> {
        return await this._userRepository.findByEmail(email);
    }
}