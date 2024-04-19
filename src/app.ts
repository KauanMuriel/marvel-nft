import fastify, { FastifyInstance } from "fastify";
import { configureRoutes } from "./domain/routes";

class App {
    public fastify: FastifyInstance;

    public constructor() {
        this.fastify = fastify();
        configureRoutes(this.fastify);
    }
}

export default new App().fastify;