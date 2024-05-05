import { FastifyRequest } from "fastify";
import { JwtPayload, decode } from "jsonwebtoken";

export class JWTHelper {
    public static decodeToken(accessToken: string): { uuid: string, password: string } {
        const accessTokenData = decode(accessToken) as JwtPayload;
        const uuid = accessTokenData.uuid;
        const password = accessTokenData.password;
        return { uuid: uuid, password: password };
    }

    public static getJWTFromRequest(request: FastifyRequest): string {
        const authorization = request.headers.authorization;
        return authorization.replace('Bearer ', "");
    }
}