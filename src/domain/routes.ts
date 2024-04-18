import { FastifyInstance } from "fastify";
import userController from "./controller/user.controller";

export function configureRoutes(app: FastifyInstance) {
    app.post('/register', userController.register)
}