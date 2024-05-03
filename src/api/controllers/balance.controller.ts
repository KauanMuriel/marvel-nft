import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "inversify";
import { IBalanceController } from "../interfaces/i.balance.controller";
import { IBalanceService } from "../../domain/interfaces/i.balance.service";
import { TYPES } from "../util/di/di-types";
import { JWTHelper } from "../util/jwt";

@injectable()
export class BalanceController implements IBalanceController {
    private readonly _balanceService: IBalanceService;

    public constructor(@inject(TYPES.IBalanceService) balanceService: IBalanceService) {
        this._balanceService = balanceService;

        this.get = this.get.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
    }
    
    public async get(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.headers.authorization;
        const { uuid } = JWTHelper.decodeToken(accessToken);

        const balance = await this._balanceService.get(uuid);
        return reply.send( { balance : balance } );
    }

    public async withdraw(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.headers.authorization;
        const { uuid } = JWTHelper.decodeToken(accessToken);
        const value = request.body['value'];

        await this._balanceService.withdraw(uuid, value);
        return reply.send( { message: "Withdraw successful!" } );
    }

    public async deposit(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const accessToken = request.headers.authorization;
        const { uuid } = JWTHelper.decodeToken(accessToken);
        const value = request.body['value'];

        await this._balanceService.deposit(uuid, value);
        return reply.send( { message: "Depoit successful!" } );
    }
}