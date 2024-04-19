import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";
import { GetUserDto } from "../dto/get-user.dto";

class UserController {
    private _userService: UserService;

    public constructor() {
        this._userService = new UserService();
        this.register = this.register.bind(this);
    }

    public async register(request: FastifyRequest, reply: FastifyReply) {
        const userDto = request.body as User;
        const createdUser = await this._userService.create(userDto);
        reply.send(new GetUserDto(createdUser));
    };
}

export default new UserController();