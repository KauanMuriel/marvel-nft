import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authorization = request.headers.authorization;
    console.log(authorization)
    if (authorization === '' || authorization === null || !authorization) {
        return reply.status(401).send({ message: "Authentication required"});
    }

    const encodedToken = authorization.replace('Bearer ', "");
    try {
        verify(encodedToken, process.env.JWT_SECRET)
    } catch(error) {
        return reply.status(401).send({ message: "Authentication failed"});
    }
}