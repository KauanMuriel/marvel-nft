import { User } from "../entity/user.entity";

export class GetUserDto {
    email: string;

    public constructor(data: User) {
        this.email = data.email;
    }
}