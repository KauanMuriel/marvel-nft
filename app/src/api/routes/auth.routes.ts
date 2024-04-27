import { FastifyInstance } from "fastify";
import { signupSchema } from "./schemas/auth.schemas";
import { authenticate } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";

export function configureAuthRoutes(app: FastifyInstance) {
    app.register((app, options, done) => {
        app.post('/signup', { schema: signupSchema }, authController.signup);
        app.post('/signin', { schema: signupSchema }, authController.signin);
        app.post('/logout', { preHandler: authenticate }, authController.logout);
        done();
    });
}