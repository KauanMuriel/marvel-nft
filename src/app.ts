import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import { configureAuthRoutes } from "./domain/routes";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

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

    public constructor() {
        this.fastify = fastify();
        this.configureSwagger();
        this.configureRoutes(this.fastify);
    }

    private configureRoutes(fastify: FastifyInstance) {
        configureAuthRoutes(fastify);
    }

    private configureSwagger() {
        this.fastify.register(fastifySwagger, swaggerOptions);
        this.fastify.register(fastifySwaggerUi, swaggerUiOptions);
    }
}

export default new App().fastify;