import { FastifyInstance } from "fastify";
import { ICharacterController } from "../interfaces/i.character.controller";
import { genericUuidSchemaParams } from "./schemas/generic.schema";
import { createCharacterSchema, updateCharacterSchema } from "./schemas/character.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { verifyIsAdmin } from "../middlewares/admin.middleware";

export function configureCharacterRoutes(app: FastifyInstance, characterController: ICharacterController) {
    app.register((app, options, done) => {
        app.get('/character/:uuid', { schema: { params: genericUuidSchemaParams, tags: ['character'] } }, characterController.getByUuid);
        app.get('/character', { schema: { tags: ['character'] } }, characterController.getAll);
        app.post('/character', { preHandler: [authenticate, verifyIsAdmin], schema: createCharacterSchema }, characterController.create);
        app.put('/character/:uuid', { preHandler: [authenticate, verifyIsAdmin], schema: updateCharacterSchema }, characterController.update);
        app.delete('/character/:uuid', { preHandler: [authenticate, verifyIsAdmin], schema: {  params: genericUuidSchemaParams, tags: ['character'] } }, characterController.delete);
        done();
    })
}