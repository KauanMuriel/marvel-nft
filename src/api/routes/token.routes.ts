import { FastifyInstance } from "fastify";
import { ITokenController } from "../interfaces/i.token.controller";

export function configureTokenRoutes(app: FastifyInstance, tokenController: ITokenController) {
    app.register((app, options, done) => {
        app.get('/token', tokenController.getAll);
        app.get('/token/mining', tokenController.mine);
        done();
    })
}