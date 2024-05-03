import { HttpException } from "./http.exception";

export class BadRequestException extends HttpException {
    public constructor(message: string) {
        super(400, message);
        this.name = "Bad Request";
    }
}