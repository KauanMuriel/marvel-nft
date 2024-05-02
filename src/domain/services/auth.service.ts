import { compare, hash } from "bcrypt";
import { User } from "../entities/user.entity";
import { JwtPayload, decode, sign } from "jsonwebtoken";
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

    private async validateCredentials(stranger: User, existsUser: User): Promise<void> {
        if (!existsUser) {
            throw new UnauthorizedException("The email or password is wrong!");
        }

        const passwordHashed = await hash(stranger.password, process.env.BCRYPT_SALT);

        if (!await compare(existsUser.password, passwordHashed)) {
            throw new UnauthorizedException("The email or password is wrong!");
        }
    }

    public async signin(stranger: User): Promise<string> {
        const existsUser = await this._userService.getByEmail(stranger.email);
        await this.validateCredentials(stranger, existsUser);
        return sign({ uuid: existsUser.uuid, password: existsUser.password }, process.env.JWT_SECRET, { expiresIn: '2h'});
    }

    public async validateTokenCredentials(userUuid: string, password: string) {
        const existsUser = await this._userService.getByUuid(userUuid);
        this.validateCredentials({ password: password} as User, existsUser);
    }

    public async signup(user: User): Promise<User> {
        user.password = await hash(user.password, process.env.BCRYPT_SALT);
        return await this._userService.create(user);
    }
}