import { describe, expect, test } from '@jest/globals'
import app from "../../src/app";

describe("/ping", () => {
    test("GET must return pong", async () => {
        const response = await app.inject({ method: 'GET', url: '/ping' });
        if (response) {
            expect(response.statusCode).toBe(200);
            expect(response.body).toBe('pong');
        }
    })
})