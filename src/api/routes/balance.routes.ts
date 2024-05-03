import { FastifyInstance } from "fastify";
import { IBalanceController } from "../interfaces/i.balance.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { balanceOperationSchema, genericBalanceResponse } from "./schemas/balance.schemas";

export function configureBalanceRoutes(app: FastifyInstance, balanceController: IBalanceController) {
    app.register((app, options, done) => {
        app.get('/balance', { schema: { tags: ['balance'], response: genericBalanceResponse }, preHandler: [authenticate] }, balanceController.get);
        app.post('/balance/withdraw', { schema: balanceOperationSchema, preHandler: [authenticate] }, balanceController.withdraw);
        app.post('/balance/deposit', { schema: balanceOperationSchema, preHandler: [authenticate] }, balanceController.deposit);
        done();
    });
}