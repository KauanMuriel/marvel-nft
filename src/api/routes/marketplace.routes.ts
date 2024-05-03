import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middleware";
import { IMarketplaceController } from "../interfaces/i.marketplace.controller";

export function configureMarketplaceRoutes(app: FastifyInstance, marketplaceController: IMarketplaceController) {
    app.register((app, options, done) => {
        app.get('/marketplace/token/for-sale', { preHandler: authenticate, schema: { tags: ['marketplace'] } }, marketplaceController.getForSale);
        done();
    })
}