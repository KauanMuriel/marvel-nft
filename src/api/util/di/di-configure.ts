import "reflect-metadata"
import { Container } from "inversify";
import { IUserService } from "../../../domain/interfaces/i.user.service";
import { TYPES } from "./di-types";
import { UserService } from "../../../domain/services/user.service";
import { IUserRepository } from "../../../domain/interfaces/i.user.respository";
import { UserRepository } from "../../../infrastructure/db/repositories/user.repository";
import { IAuthService } from "../../../domain/interfaces/i.auth.service";
import { AuthService } from "../../../domain/services/auth.service";
import { IAuthController } from "../../interfaces/i.auth.controller";
import { AuthController } from "../../controllers/auth.controller";
import { MockUserRepository } from "../../../../test/mocks/user.repository.mock";

function configureDependencyContainer(container: Container) {
    container.bind<IUserService>(TYPES.IUserService).to(UserService);
    container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
    container.bind<IAuthController>(TYPES.IAuthController).to(AuthController);

    if(process.env.NODE_ENV === 'test') {
        container.bind<IUserRepository>(TYPES.IUserRepository).to(MockUserRepository);       
    } else {
        container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
    }
}

export { configureDependencyContainer };