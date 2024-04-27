import { FastifyReply, FastifyRequest } from "fastify";
import * as fastifyCookie from "@fastify/cookie";
import { User } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";

class AuthController {
    private readonly _authService: AuthService;

    public constructor() {
        this._authService = new AuthService();
    }

    public async signup(request: FastifyRequest, reply: FastifyReply) {
        const createdUser = this._authService.signup(request.body as User);
        return reply.send(createdUser);
    };

    public async signin(request: FastifyRequest, reply: FastifyReply) {
        const requestBody = request.body as User;
        const accessToken = await this._authService.signin(requestBody);

        reply.setCookie('access_token', accessToken, { secure: true, httpOnly: true })
        
        return reply.send({ accessToken: accessToken });
    }

    public async logout(request: FastifyRequest, reply: FastifyReply) {
        reply.clearCookie('access_token');
        return reply.send({ message: "Logout successful!"});
    }
}

export default new AuthController();