import { FastifyInstance } from "fastify";
import { IComicController } from "../interfaces/i.comic.controller";
import { simpleGetSchemaParams } from "./schemas/generic.schema";
import { createComicSchema, updateComicSchema } from "./schemas/comic.schemas";
import { authenticate } from "../middlewares/auth.middleware";
import { verifyIsAdmin } from "../middlewares/admin.middleware";

export function configureComicRoutes(app: FastifyInstance, comicController: IComicController) {
    app.register((app, options, done) => {
        app.get('/comic/:id', { schema: { params: simpleGetSchemaParams, tags: ['comic'] } }, comicController.getById);
        app.get('/comic', { schema: { tags: ['comic'] } }, comicController.getAll);
        app.post('/comic', { schema: createComicSchema, preHandler: [authenticate, verifyIsAdmin] }, comicController.create);
        app.put('/comic', { schema: updateComicSchema, preHandler: [authenticate, verifyIsAdmin] }, comicController.update);
        app.delete('/comic', { schema: { tags: ['comic'] }, preHandler: [authenticate, verifyIsAdmin] }, comicController.delete);
        done();
    })
}