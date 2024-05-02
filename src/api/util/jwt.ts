import { JwtPayload, decode } from "jsonwebtoken";

export class JWTHelper {
    public static async decodeToken(accessToken: string): Promise<{ uuid: string, password: string }> {
        const accessTokenData = decode(accessToken) as JwtPayload;
        const uuid = accessTokenData.uuid;
        const password = accessTokenData.password;
        return { uuid: uuid, password: password };
    }
}