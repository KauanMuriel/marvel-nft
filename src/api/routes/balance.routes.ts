import { FastifyInstance } from "fastify";
import { IBalanceController } from "../interfaces/i.balance.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { balanceSchema } from "./schemas/balance.schemas";

export function configureBalanceRoutes(app: FastifyInstance, balanceController: IBalanceController) {
    app.register((app, options, done) => {
        app.get('/balance', { preHandler:[authenticate] }, balanceController.get);
        app.post('/balance/withdraw', { schema: { params:  balanceSchema}, preHandler:[authenticate] }, balanceController.withdraw);
        app.post('/balance/deposit', { schema: { params:  balanceSchema}, preHandler:[authenticate] }, balanceController.deposit);
        done();
    });
}