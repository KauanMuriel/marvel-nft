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
    private readonly _container: Container;
    private readonly _authController: IAuthController;

    public constructor() {
        this.fastify = fastify();
        this._container = new Container({ defaultScope: "Request" });
        configureDependencyContainer(this._container);
        this._authController = this._container.get<IAuthController>(TYPES.IAuthController);
        this.configureCookies();
        this.configureSwagger();
        this.configureRoutes();
    }

    private configureRoutes() {
        configureAuthRoutes(this.fastify, this._authController);
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

export default new App().fastify;