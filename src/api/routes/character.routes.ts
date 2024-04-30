import { FastifyInstance } from "fastify";
import { ICharacterController } from "../interfaces/i.character.controller";
import { simpleGetSchemaParams } from "./schemas/generic.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { verifyIsAdmin } from "../middlewares/admin.middleware";

export function configureCharacterRoutes(app: FastifyInstance, characterController: ICharacterController) {
    app.register((app, options, done) => {
        app.get('/character/:id', {
            schema: { params: simpleGetSchemaParams }, preHandler: [authenticate, verifyIsAdmin]
        },
            characterController.getById);
        app.get('/character', { preHandler: [authenticate, verifyIsAdmin] }, characterController.getAll);
        app.post('/character', { preHandler: [authenticate, verifyIsAdmin] }, characterController.create);
        app.put('/character', { preHandler: [authenticate, verifyIsAdmin] }, characterController.update);
        app.delete('/character', { preHandler: [authenticate, verifyIsAdmin] }, characterController.delete);
        done();
    })
}