import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import { configureAuthRoutes } from "./api/routes/auth.routes";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifyCookie } from "@fastify/cookie";
import { configureHealthCheckRoutes } from "./api/routes/health-check.routes";
import { Container } from "inversify";
import { configureDependencyContainer } from "./api/util/di/di-configure";
import { IAuthController } from "./api/interfaces/i.auth.controller";
import { TYPES } from "./api/util/di/di-types";
import { ICreatorController } from "./api/interfaces/i.creator.controller";
import { configureCreatorRoutes } from "./api/routes/creator.routes";
import { ICharacterController } from "./api/interfaces/i.character.controller";
import { IComicController } from "./api/interfaces/i.comic.controller";
import { configureCharacterRoutes } from "./api/routes/character.routes";
import { configureComicRoutes } from "./api/routes/comic.routes";
import { IBalanceController } from "./api/interfaces/i.balance.controller";
import { configureBalanceRoutes } from "./api/routes/balance.routes";

const swaggerUiOptions = { routePrefix: "/docs" };
const swaggerOptions = {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Marvel-nft',
            description: 'A marvel contents tokenized system',
            version: '0.1.0'
        },
        host: "localhost",
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
            { name: 'auth', description: 'Authentication end-points' },
        ]
    },
    externalDocs: {
        url: 'https://github.com/KauanMuriel/marvel-nft',
        description: 'Find the repository here'
    }
};

class App {
    public fastify: FastifyInstance;
    public container: Container;
    private readonly _authController: IAuthController;
    private readonly _creatorController: ICreatorController;
    private readonly _characterController: ICharacterController;
    private readonly _comicController: IComicController;
    private readonly _balanceController: IBalanceController;

    public constructor() {
        this.fastify = fastify();
        this.container = new Container({ defaultScope: "Request" });
        configureDependencyContainer(this.container);
        this._authController = this.container.get<IAuthController>(TYPES.IAuthController);
        this._creatorController = this.container.get<ICreatorController>(TYPES.ICreatorController);
        this._characterController = this.container.get<ICharacterController>(TYPES.ICharacterController);
        this._comicController = this.container.get<IComicController>(TYPES.IComicController);
        this._balanceController = this.container.get<IBalanceController>(TYPES.IBalanceController);
        this.configureCookies();
        this.configureSwagger();
        this.configureRoutes();
    }

    private configureRoutes() {
        configureAuthRoutes(this.fastify, this._authController);
        configureCreatorRoutes(this.fastify, this._creatorController);
        configureCharacterRoutes(this.fastify, this._characterController);
        configureComicRoutes(this.fastify, this._comicController);
        configureBalanceRoutes(this.fastify, this._balanceController);
        configureHealthCheckRoutes(this.fastify);
    }

    private configureCookies() {
        this.fastify.register(fastifyCookie);
    }

    private configureSwagger() {
        this.fastify.register(fastifySwagger, swaggerOptions);
        this.fastify.register(fastifySwaggerUi, swaggerUiOptions);
    }
}

export default new App();