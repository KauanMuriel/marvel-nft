import fastify, { FastifyInstance, FastifyRegisterOptions } from "fastify";
import fastifySwagger, { FastifyDynamicSwaggerOptions, FastifyStaticSwaggerOptions, FastifySwaggerOptions, SwaggerOptions } from "@fastify/swagger";
import { configureAuthRoutes } from "./api/routes/auth.routes";
import { FastifySwaggerUiOptions, fastifySwaggerUi } from "@fastify/swagger-ui";
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
import { ITokenController } from "./api/interfaces/i.token.controller";
import { configureTokenRoutes } from "./api/routes/token.routes";
import { IMarketplaceController } from "./api/interfaces/i.marketplace.controller";
import { configureMarketplaceRoutes } from "./api/routes/marketplace.routes";

const swaggerUiOptions = { routePrefix: "/docs" };
const swaggerOptions = {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Marvel-nft',
            description: 'Similar to an NFT ecosystem, the platform allows for the mining of unique tokens that can be sold within the marketplace. These tokens are generated from requests to the Marvel API.',
            version: '1.0.0'
        },
        host: "localhost",
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
            { name: 'auth', description: 'Authentication end-points' },
            { name: 'creator', description: 'The creator end-points that can be used to define the favorite creator of the user' },
            { name: 'character', description: 'The creator end-points that can be used to define the favorite character of the user' },
            { name: 'comic', description: 'The comic end-points that can be used to define the favorite comic of the user' },
            { name: 'token', description: 'End-points used to mine, get all tokens and the details of a specific token' },
            { name: 'balance', description: "End-points that can be used to manipulate and visualize user's balance" },
            { name: 'marketplace', description: 'Marketplace end-points used to put tokens for sale and buy them' },
            { name: 'health-check', description: 'End-points that can be used to verify system execution' }
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
    private readonly _tokenController: ITokenController;
    private readonly _marketplaceController: IMarketplaceController;

    public constructor() {
        this.fastify = fastify();
        this.container = new Container({ defaultScope: "Request" });
        configureDependencyContainer(this.container);
        this._authController = this.container.get<IAuthController>(TYPES.IAuthController);
        this._creatorController = this.container.get<ICreatorController>(TYPES.ICreatorController);
        this._characterController = this.container.get<ICharacterController>(TYPES.ICharacterController);
        this._comicController = this.container.get<IComicController>(TYPES.IComicController);
        this._balanceController = this.container.get<IBalanceController>(TYPES.IBalanceController);
        this._tokenController = this.container.get<ITokenController>(TYPES.ITokenController);
        this._marketplaceController = this.container.get<IMarketplaceController>(TYPES.IMarketplaceController);
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
        configureTokenRoutes(this.fastify, this._tokenController);
        configureMarketplaceRoutes(this.fastify, this._marketplaceController);
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