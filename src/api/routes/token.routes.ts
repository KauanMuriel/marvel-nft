import { FastifyInstance } from "fastify";
import { ITokenController } from "../interfaces/i.token.controller";
import { authenticate } from "../middlewares/auth.middleware";

export function configureTokenRoutes(app: FastifyInstance, tokenController: ITokenController) {
    app.register((app, options, done) => {
        app.get('/token', tokenController.getAll);
        app.get('/token/mining', { preHandler: authenticate }, tokenController.mine);
        done();
    })
}