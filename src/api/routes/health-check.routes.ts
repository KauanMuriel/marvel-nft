import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function configureHealthCheckRoutes(app: FastifyInstance) {
    app.register((app, options, done) => {
        app.get('/ping', (request: FastifyRequest, reply: FastifyReply) => { return reply.send('pong') })
        done();
    })
}