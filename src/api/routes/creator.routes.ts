import { FastifyInstance } from "fastify";
import { ICreatorController } from "../interfaces/i.creator.controller";
import { simpleGetSchemaParams } from "./schemas/generic.schema";
import { createCreatorSchema, updateCreatorSchema } from "./schemas/creator.schemas";
import { verifyIsAdmin } from "../middlewares/admin.middleware";
import { authenticate } from "../middlewares/auth.middleware";

export function configureCreatorRoutes(app: FastifyInstance, creatorController: ICreatorController) {
    app.register((app, options, done) => {
        app.get('/creator/:id', { schema: { params: simpleGetSchemaParams, tags: ['creator'] } }, creatorController.getById);
        app.get('/creator', { schema: { tags: ['creator'] } }, creatorController.getAll);
        app.post('/creator', { schema: createCreatorSchema, preHandler: [authenticate, verifyIsAdmin] }, creatorController.create);
        app.put('/creator', { schema: updateCreatorSchema, preHandler: [authenticate, verifyIsAdmin] }, creatorController.update);
        app.delete('/creator', { schema: { tags: ['creator'] }, preHandler: [authenticate, verifyIsAdmin] }, creatorController.delete);
        done();
    })
}