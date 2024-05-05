import { FastifyInstance } from "fastify";
import { ITokenController } from "../interfaces/i.token.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { getTokenDetailsSchema, getTokensSchema } from "./schemas/token.schemas";

export function configureTokenRoutes(app: FastifyInstance, tokenController: ITokenController) {
    app.register((app, options, done) => {
        app.get('/token', { schema: getTokensSchema }, tokenController.getAll);
        app.get('/token/:uuid', { schema: getTokenDetailsSchema }, tokenController.getByUuid);
        app.get('/token/mining', { preHandler: authenticate, schema: { tags: ['token'] } }, tokenController.mine);
        done();
    })
}