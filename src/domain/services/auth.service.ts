import { compare, hash } from "bcrypt";
import { User } from "../entities/user.entity";
import { sign } from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { IAuthService } from "../interfaces/i.auth.service";
import { IUserService } from "../interfaces/i.user.service";
import { inject, injectable } from "inversify";
import { TYPES } from "../../api/util/di/di-types";

@injectable()
export class AuthService implements IAuthService {
    private readonly _userService: IUserService;

    public constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this._userService = userService;

        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
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

    public async signup(user: User): Promise<User> {
        user.password = await hash(user.password, process.env.BCRYPT_SALT);
        return await this._userService.create(user);
    }
}