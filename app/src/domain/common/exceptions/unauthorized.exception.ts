import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
    public constructor(message: string) {
        super(401, message);
        this.name = "Unauthorized exception";
    }
}