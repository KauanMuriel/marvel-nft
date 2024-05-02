import { FastifyReply, FastifyRequest } from "fastify";
import app from "../../app";
import { IUserRepository } from "../../domain/interfaces/i.user.respository";
import { TYPES } from "../util/di/di-types";

export async function verifyIsAdmin(request: FastifyRequest, reply: FastifyReply) {
    // const authorization = request.headers.authorization;

    // const token = authorization.replace("Bearer ", "");

    // const userRepository = app.container.get<IUserRepository>(TYPES.IUserRepository);
    // const user = await userRepository.findByUuid(jwt.uuid);

    // if (!user.admin) {
    //     return reply.status(403).send({ message: "The user isn't allowed to do this operation" });
    // }
}