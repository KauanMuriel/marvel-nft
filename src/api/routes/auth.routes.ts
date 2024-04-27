import { FastifyInstance } from "fastify";
import { signupSchema } from "./schemas/auth.schemas";
import { authenticate } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";

export function configureAuthRoutes(app: FastifyInstance) {
    app.register((app, options, done) => {
        app.post('/auth/signup', { schema: signupSchema }, authController.signup);
        app.post('/auth/signin', { schema: signupSchema }, authController.signin);
        app.post('/auth/logout', { preHandler: authenticate }, authController.logout);
        done();
    });
}