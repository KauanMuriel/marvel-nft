import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

describe("/auth/signup", () => {
    beforeAll(async () => {
        configDotenv({path: "./.env"})
    })
    
    test("Must fail if don't pass email", async () => {
        const requestBody = { username: "kauan.rossi", password: "testing123"};
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("Must fail if don't pass password", async () => {
        const requestBody = { username: "kauan.rossi", email: "testing.br@email.com"};
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("Must fail if pass a duplicate email user", async () => {
        const requestBody = { username: "kauan.rossi", password: "testing123", email: "testing.br@email.com"}
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(409);
        }
    })

    test("Must return an valid uuid if all properties valid", async () => {
        const requestBody = { username: "kauan.test", password: "testing123", email: "testing.br@testing.com"}
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(200);
            const responseBody = JSON.parse(response.body);
            const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            expect(uuidRegex.test(responseBody.uuid)).toBeTruthy();
        }
    })
})