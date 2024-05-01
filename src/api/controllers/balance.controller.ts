import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "inversify";
import { IBalanceController } from "../interfaces/i.balance.controller";
import { IBalanceService } from "../../domain/interfaces/i.balance.service";
import { IUserService } from "../../domain/interfaces/i.user.service";
import { JwtPayload, decode } from "jsonwebtoken";
import { IAuthService } from "../../domain/interfaces/i.auth.service";

@injectable()
export class BalanceController implements IBalanceController {
    private readonly _balanceService: IBalanceService;
    private readonly _authService: IAuthService;
    
    public async get(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.cookies['access_token'];
        const user = await this._authService.decodeToken(accessToken);

        const balance = await this._balanceService.get(user);
        return reply.send(balance);
    }

    public async withdraw(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.cookies['access_token'];
        const user = await this._authService.decodeToken(accessToken);
        const value = request.body['value'];

        await this._balanceService.withdraw(user, value);
        return reply.send( { message: "Withdraw successful!" } );
    }

    public async deposit(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.cookies['access_token'];
        const user = await this._authService.decodeToken(accessToken);
        const value = request.body['value'];

        await this._balanceService.deposit(user, value);
        return reply.send( { message: "Depoit successful!" } );
    }
}