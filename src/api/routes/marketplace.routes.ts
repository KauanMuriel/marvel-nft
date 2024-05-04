import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middleware";
import { IMarketplaceController } from "../interfaces/i.marketplace.controller";
import { buyTokenSchema, sellTokenSchema } from "./schemas/marketplace.schemas";

export function configureMarketplaceRoutes(app: FastifyInstance, marketplaceController: IMarketplaceController) {
    app.register((app, options, done) => {
        app.get('/marketplace/token/for-sale', { schema: { tags: ['marketplace'] } }, marketplaceController.getForSale);
        app.get('/marketplace/token/for-exchange', { schema: { tags: ['marketplace'] } }, marketplaceController.getForExchange);
        app.post('/marketplace/token/sell', { preHandler: authenticate, schema: sellTokenSchema }, marketplaceController.sellToken);
        app.post('/marketplace/token/buy', { preHandler: authenticate, schema: buyTokenSchema }, marketplaceController.buyToken);
        done();
    })
}