import { compare, hash } from "bcrypt";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { sign } from "jsonwebtoken";
import { UnauthorizedException } from "../common/exceptions/unauthorized.exception";

export class AuthService {
    private readonly _userService: UserService;

    public constructor() {
        this._userService = new UserService();
    }

    public async signin(user: User): Promise<string> {
        const existsUser = await this._userService.getByEmail(user.email);

        if (existsUser === null) {
            throw new UnauthorizedException("The email or password is wrong!");
        }

        const passwordHashed = await hash(user.password, process.env.BCRYPT_SALT);

        if (!await compare(existsUser.password, passwordHashed)) {
            throw new UnauthorizedException("The email or password is wrong!");
        }

        return sign({ uuid: existsUser.uuid }, process.env.JWT_SECRET, { expiresIn: '2h'})
    }

    public async signup(user: User) {
        user.password = await hash(user.password, process.env.BCRYPT_SALT);
        return await this._userService.create(user);
    }
}