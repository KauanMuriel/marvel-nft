import { FastifyInstance } from "fastify";
import { signinSchema, signupSchema } from "./schemas/auth.schemas";
import { authenticate } from "../middlewares/auth.middleware";
import { IAuthController } from "../interfaces/i.auth.controller";

export function configureAuthRoutes(app: FastifyInstance, authController: IAuthController) {
    app.register((app, options, done) => {
        app.post('/auth/signup', { schema: signupSchema }, authController.signup);
        app.post('/auth/signin', { schema: signinSchema }, authController.signin);
        app.post('/auth/logout', { preHandler: authenticate }, authController.logout);
        done();
    });
}