import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
    public constructor(message: string) {
        super(404, message);
        this.name = "Not found exception";
    }
}