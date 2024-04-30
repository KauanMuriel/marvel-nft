import { injectable } from "inversify";
import { User } from "../../src/domain/entities/user.entity";
import { IUserRepository } from "../../src/domain/interfaces/i.user.respository";

@injectable()
export class MockUserRepository implements IUserRepository {
    public users: User[] = [];

    public constructor() {
        this.users = [];
        this.users.push({ 
            uuid: "ae430434-f3d5-492f-893a-78e110211a70", 
            username: "kauan.rossi",
            password: "testing123",
            email: "testing.br@email.com"
        } as User);
    }
    create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve({ uuid: "4de9c6d0-c149-401f-a742-e70b98a629f7", ...user });
        });
    }
    findByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.users.find((user) => user.email === email));
        });
    }

    public async findByUuid(uuid: string): Promise<User> {
        return new Promise((resolve, reject) => {
            resolve(this.users.find((user) => user.uuid === uuid));
        })
    }
}