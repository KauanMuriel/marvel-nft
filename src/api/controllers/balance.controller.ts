import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "inversify";
import { IBalanceController } from "../interfaces/i.balance.controller";
import { IBalanceService } from "../../domain/interfaces/i.balance.service";
import { IUserService } from "../../domain/interfaces/i.user.service";
import { JwtPayload, decode } from "jsonwebtoken";
import { IAuthService } from "../../domain/interfaces/i.auth.service";
import { TYPES } from "../util/di/di-types";
import { JWTHelper } from "../util/jwt";
import { User } from "../../domain/entities/user.entity";

@injectable()
export class BalanceController implements IBalanceController {
    private readonly _balanceService: IBalanceService;
    private readonly _authService: IAuthService;

    public constructor(@inject(TYPES.IBalanceService) balanceService: IBalanceService, @inject(TYPES.IAuthService) authService: IAuthService) {
        this._balanceService = balanceService;
        this._authService = authService;
    }
    
    public async get(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.headers.authorization;
        const { uuid } = await JWTHelper.decodeToken(accessToken);

        const balance = await this._balanceService.get(uuid);
        return reply.send( { balance : balance } );
    }

    public async withdraw(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.headers.authorization;
        const { uuid } = await JWTHelper.decodeToken(accessToken);
        const value = request.body['value'];

        await this._balanceService.withdraw(uuid, value);
        return reply.send( { message: "Withdraw successful!" } );
    }

    public async deposit(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.headers.authorization;
        const { uuid } = await JWTHelper.decodeToken(accessToken);
        const value = request.body['value'];

        await this._balanceService.deposit(uuid, value);
        return reply.send( { message: "Depoit successful!" } );
    }
}