import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

class UserController {
    private _userService: UserService;

    public constructor() {
        this._userService = new UserService();
        this.register = this.register.bind(this);
    }

    public async register(request: FastifyRequest, reply: FastifyReply) {
        const createdUser = await this._userService.create(request.body as User);
        reply.send(createdUser);
    };
}

export default new UserController();