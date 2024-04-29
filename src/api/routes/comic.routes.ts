import { FastifyInstance } from "fastify";
import { IComicController } from "../interfaces/i.comic.controller";
import { simpleGetSchemaParams } from "./schemas/generic.schema";

export function configureComicRoutes(app: FastifyInstance, comicController: IComicController) {
    app.register((app, options, done) => {
        app.get('/comic/:id', { schema: { params: simpleGetSchemaParams } }, comicController.getById);
        app.get('/comic', comicController.getAll);
        app.post('/comic', comicController.create);
        app.put('/comic', comicController.update);
        app.delete('/comic', comicController.delete);
        done();
    })
}