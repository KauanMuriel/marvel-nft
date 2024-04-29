import { FastifyInstance } from "fastify";
import { ICreatorController } from "../interfaces/i.creator.controller";
import { simpleGetSchemaParams } from "./schemas/generic.schema";

export function configureCreatorRoutes(app: FastifyInstance, creatorController: ICreatorController) {
    app.register((app, options, done) => {
        app.get('/creator/:id', { schema: { params: simpleGetSchemaParams } }, creatorController.getById);
        app.get('/creator', creatorController.getAll);
        app.post('/creator', creatorController.create);
        app.put('/creator', creatorController.update);
        app.delete('/creator', creatorController.delete);
        done();
    })
}