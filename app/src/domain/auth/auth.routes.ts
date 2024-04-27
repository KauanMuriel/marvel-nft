import { FastifyInstance } from "fastify";
import { signupSchema } from "./auth.schemas";
import { authenticate } from "../common/middlewares/auth.middleware";
import authController from "./auth.controller";

export function configureAuthRoutes(app: FastifyInstance) {
    app.register((app, options, done) => {
        app.post('/signup', { schema: signupSchema }, authController.signup);
        app.post('/signin', { schema: signupSchema }, authController.signin);
        app.post('/logout', { preHandler: authenticate }, authController.logout);
        done();
    });
}