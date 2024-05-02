import "reflect-metadata"
import { Container } from "inversify";
import { IUserService } from "../../../domain/interfaces/i.user.service";
import { TYPES } from "./di-types";
import { IUserRepository } from "../../../domain/interfaces/i.user.respository";
import { IAuthService } from "../../../domain/interfaces/i.auth.service";
import { IAuthController } from "../../interfaces/i.auth.controller";
import { ICreatorController } from "../../interfaces/i.creator.controller";
import { ICreatorService } from "../../../domain/interfaces/i.creator.service";
import { ICreatorRepository } from "../../../domain/interfaces/i.creator.repository";
import { ICharacterRepository } from "../../../domain/interfaces/i.character.repository";
import { ICharacterController } from "../../interfaces/i.character.controller";
import { IComicRepository } from "../../../domain/interfaces/i.comic.repository";
import { ICharacterService } from "../../../domain/interfaces/i.character.service";
import { IComicService } from "../../../domain/interfaces/i.comic.service";
import { IComicController } from "../../interfaces/i.comic.controller";
import { CreatorService, ComicService, CharacterService, AuthService, UserService, TokenService } from "../../../domain/services/index";
import { CharacterController, CreatorController, ComicController, AuthController } from "../../controllers/index";
import { CharacterRepository, CreatorRepository, ComicRepository, UserRepository, TokenRepository } from "../../../infrastructure/db/repositories/index";
import { ComicRepositoryMock, CharacterRepositoryMock, CreatorRepositoryMock, UserRepositoryMock } from "../../../../test/mocks/index";
import { ITokenController } from "../../interfaces/i.token.controller";
import { TokenController } from "../../controllers/token.controller";
import { ITokenRepository } from "../../../domain/interfaces/i.token.repository";
import { ITokenService } from "../../../domain/interfaces/i.token.service";

function configureDependencyContainer(container: Container) {
    container.bind<IUserService>(TYPES.IUserService).to(UserService);
    container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
    container.bind<ICreatorService>(TYPES.ICreatorService).to(CreatorService);
    container.bind<ICharacterService>(TYPES.ICharacterService).to(CharacterService);
    container.bind<IComicService>(TYPES.IComicService).to(ComicService);
    container.bind<ITokenService>(TYPES.ITokenService).to(TokenService);

    container.bind<IAuthController>(TYPES.IAuthController).to(AuthController);
    container.bind<ICreatorController>(TYPES.ICreatorController).to(CreatorController);
    container.bind<ICharacterController>(TYPES.ICharacterController).to(CharacterController);
    container.bind<IComicController>(TYPES.IComicController).to(ComicController);
    container.bind<ITokenController>(TYPES.ITokenController).to(TokenController);

    if(process.env.NODE_ENV === 'test') {
        container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryMock);
        container.bind<ICreatorRepository>(TYPES.ICreatorRepository).to(CreatorRepositoryMock);
        container.bind<ICharacterRepository>(TYPES.ICharacterRepository).to(CharacterRepositoryMock)
        container.bind<IComicRepository>(TYPES.IComicRepository).to(ComicRepositoryMock);
    } else {
        container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
        container.bind<ICreatorRepository>(TYPES.ICreatorRepository).to(CreatorRepository).inSingletonScope();
        container.bind<ICharacterRepository>(TYPES.ICharacterRepository).to(CharacterRepository).inSingletonScope();
        container.bind<IComicRepository>(TYPES.IComicRepository).to(ComicRepository).inSingletonScope();
        container.bind<ITokenRepository>(TYPES.ITokenRepository).to(TokenRepository).inSingletonScope();
    }
}

export { configureDependencyContainer };