import { HttpException } from "./http.exception";

export class UnprocessableEntityException extends HttpException {
    public constructor(message: string) {
        super(422, message);
        this.name = "Unprocessable entity exception";
    }
}