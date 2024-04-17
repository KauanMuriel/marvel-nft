import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository"

export class UserService {
    private _userRepository: UserRepository;

    public create = async (user: User): Promise<User> => {
        return await this._userRepository.create(user);
    }
}