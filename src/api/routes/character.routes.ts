import { FastifyInstance } from "fastify";
import { ICharacterController } from "../interfaces/i.character.controller";
import { simpleGetSchemaParams } from "./schemas/generic.schema";

export function configureCharacterRoutes(app: FastifyInstance, characterController: ICharacterController) {
    app.register((app, options, done) => {
        app.get('/character/:id', { schema: { params: simpleGetSchemaParams } }, characterController.getById);
        app.get('/character', characterController.getAll);
        app.post('/character', characterController.create);
        app.put('/character', characterController.update);
        app.delete('/character', characterController.delete);
        done();
    })
}