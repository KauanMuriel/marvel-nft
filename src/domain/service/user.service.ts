import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository"

export class UserService {
    private _userRepository: UserRepository;

    public constructor() {
        this._userRepository = new UserRepository();

        this.create = this.create.bind(this);
    }

    public async create(user: User): Promise<User> {
        return await this._userRepository.create(user);
    }
}