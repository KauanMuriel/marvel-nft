import { FastifyReply, FastifyRequest } from "fastify";
import app from "../../app";
import { IUserRepository } from "../../domain/interfaces/i.user.respository";
import { TYPES } from "../util/di/di-types";
import { JWTHelper } from "../util/jwt";

export async function verifyIsAdmin(request: FastifyRequest, reply: FastifyReply) {
    const authorization = request.headers.authorization;

    const encodedToken = authorization.replace('Bearer ', "");
    const { uuid } = await JWTHelper.decodeToken(encodedToken);

    const userRepository = app.container.get<IUserRepository>(TYPES.IUserRepository);
    const user = await userRepository.findByUuid(uuid);

    if (!user.admin) {
        return reply.status(403).send({ message: "The user isn't allowed to do this operation" });
    }
}