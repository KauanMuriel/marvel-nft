import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { JWTHelper } from "../util/jwt";
import { TYPES } from "../util/di/di-types";
import { IAuthService } from "../../domain/interfaces/i.auth.service";
import app from "../../app";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    if (process.env.NODE_ENV !== 'test') {
        const authorization = request.headers.authorization;

        if (authorization === '' || authorization === null || !authorization) {
            return reply.status(401).send({ message: "Authentication required" });
        }

        const encodedToken = authorization.replace('Bearer ', "");
        try {
            verify(encodedToken, process.env.JWT_SECRET)
            const { password, uuid } = JWTHelper.decodeToken(encodedToken);
            const authService = app.container.get<IAuthService>(TYPES.IAuthService);
            await authService.validateTokenCredentials(uuid, password);
        } catch (error) {
            return reply.status(401).send({ message: "Authentication failed" });
        }
    }
}