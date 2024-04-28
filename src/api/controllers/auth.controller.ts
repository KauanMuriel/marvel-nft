import { FastifyReply, FastifyRequest } from "fastify";
import * as fastifyCookie from "@fastify/cookie";
import { User } from "../../domain/entities/user.entity";
import { IAuthService } from "../../domain/interfaces/i.auth.service";
import { IAuthController } from "../interfaces/i.auth.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../util/di/di-types";

@injectable()
export class AuthController implements IAuthController {
    private readonly _authService: IAuthService;

    public constructor(@inject(TYPES.IAuthService) authService: IAuthService) {
        this._authService = authService;

        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async signup(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const createdUser = this._authService.signup(request.body as User);
        return reply.send(createdUser);
    };

    public async signin(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const requestBody = request.body as User;
        const accessToken = await this._authService.signin(requestBody);

        reply.setCookie('access_token', accessToken, { secure: true, httpOnly: true })
        
        return reply.send({ accessToken: accessToken });
    }

    public async logout(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        reply.clearCookie('access_token');
        return reply.send({ message: "Logout successful!"});
    }
}