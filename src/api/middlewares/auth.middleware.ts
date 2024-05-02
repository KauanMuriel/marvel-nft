import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { JWTHelper } from "../util/jwt";
import app from "../../app";
import { TYPES } from "../util/di/di-types";
import { IUserRepository } from "../../domain/interfaces/i.user.respository";
import { IAuthService } from "../../domain/interfaces/i.auth.service";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authorization = request.cookies['access_token'];
    
    if (authorization === '' || authorization === null || !authorization) {
        return reply.status(401).send({ message: "Authentication required"});
    }

    const encodedToken = authorization.replace('Bearer ', "");
    try {
        verify(encodedToken, process.env.JWT_SECRET)
        const { password, uuid } = await JWTHelper.decodeToken(encodedToken);
        const authService = app.container.get<IAuthService>(TYPES.IAuthService);
        await authService.validateTokenCredentials(uuid, password);
    } catch(error) {
        return reply.status(401).send({ message: "Authentication failed"});
    }
}