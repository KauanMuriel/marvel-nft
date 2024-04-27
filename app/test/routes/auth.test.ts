import fastify from "fastify";
import app from "../../src/app";
import * as t from 'tap';

t.test('GET ping', t => {
    t.teardown(() => app.close());

    app.inject({ method: "GET", url: '/ping'}, async (err, response) => {
        t.error(err);
        t.strictSame(response.statusCode, 200);
        t.strictSame(JSON.parse(response.payload), 'pong')
    })

    t.end();
})