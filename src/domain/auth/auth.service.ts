import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { hash, compare } from 'bcrypt';

export class AuthService {
    private readonly _userService: UserService;

    public constructor() {
        this._userService = new UserService();
    }

    public async signup(request: FastifyRequest, reply: FastifyReply) {
        const createdUser = await this._userService.create(request.body as User);
        reply.send(createdUser);
    };

    public async signin(request: FastifyRequest, reply: FastifyReply) {
        const requestBody = request.body as any;
        const existsUser = await this._userService.getByEmail(requestBody.email);

        if (existsUser === null) {
            return reply.status(400).send("The email or password is wrong!");
        }

        const passwordHashed = await hash(requestBody.password, process.env.BCRYPT_SALT);

        if (!await compare(existsUser.password, passwordHashed)) {
            return reply.status(400).send("The email or password is wrong!");
        }
    }
}