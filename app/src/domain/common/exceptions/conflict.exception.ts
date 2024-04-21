import { HttpException } from "./http.exception";

export class ConflictException extends HttpException {
    public constructor(message: string) {
        super(409, message);
        this.name = "Conflict exception";
    }
}
