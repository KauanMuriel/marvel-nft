import { FastifyInstance } from "fastify";
import userController from "./user/user.controller";
import { signupSchema } from "./user/user.schemas";

export function configureAuthRoutes(app: FastifyInstance) {
    app.register((app, options, done) => {
        app.post('/signup', { schema: signupSchema, preHandler:  }, userController.register)
        done();
    });
}