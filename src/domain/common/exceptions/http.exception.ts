export class HttpException extends Error {
    public status: number;

    public constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "Http exception";
    }
}