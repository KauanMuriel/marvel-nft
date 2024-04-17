import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";

class UserController {
    private _userService: UserService;

    public register = async (request: FastifyRequest, reply: FastifyReply) => {
        const userDto = request.body as User;
        const createdUser = await this._userService.create(userDto);
        reply.send(new GetUserDto(createdUser));
    };
}

export default new UserController();