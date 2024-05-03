import { FastifyReply, FastifyRequest } from "fastify";
import { ITokenController } from "../interfaces/i.token.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../util/di/di-types";
import { ITokenService } from "../../domain/interfaces/i.token.service";

@injectable()
export class TokenController implements ITokenController {
    private readonly _tokenService: ITokenService;

    public constructor(@inject(TYPES.ITokenService) tokenService: ITokenService) {
        this._tokenService = tokenService;

        this.mine = this.mine.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    public async mine(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const generatedToken = await this._tokenService.mine("23");
        return reply.status(201).send(generatedToken);
    }

    public async getAll(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const tokens = await this._tokenService.getAll();
        return reply.send(tokens);
    }
}