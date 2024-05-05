import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

describe("/auth/signup", () => {
    beforeAll(async () => {
        configDotenv({path: "./.env"})
    })
    
    test("POST - Must fail if don't pass email", async () => {
        const requestBody = {
            username: "kauan.test",
            password: "testing123",
            favoriteCreator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec",
            favoriteComic: "10908bca-734f-4c17-be24-22bd4db4b2eb",
            favoriteCharacter: "ae430434-f3d5-492f-893a-78e110211a70"
        }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must fail if don't pass password", async () => {
        const requestBody = {
            username: "kauan.test",
            email: "testing.br@testing.com",
            favoriteCreator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec",
            favoriteComic: "10908bca-734f-4c17-be24-22bd4db4b2eb",
            favoriteCharacter: "ae430434-f3d5-492f-893a-78e110211a70"
        }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must fail if pass a duplicate email user", async () => {
        const requestBody = {
            username: "kauan.test",
            password: "testing123",
            email: "testing.br@email.com",
            favoriteCreator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec",
            favoriteComic: "10908bca-734f-4c17-be24-22bd4db4b2eb",
            favoriteCharacter: "ae430434-f3d5-492f-893a-78e110211a70"
        }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(409);
        }
    })

    test("POST - Must fail if pass incorret user preferences", async () => {
        const requestBody = {
            username: "kauan.test",
            password: "testing123",
            email: "testing.br@testing.com",
            favoriteCreator: "163e30ed-5914-490b-8f30-7db15f4d7b6b",
            favoriteComic: "9238faad-b360-4df2-8c29-635a6eb1db83",
            favoriteCharacter: "be366ab7-34ce-4369-ad24-a9d4ff82d509"
        }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(422);
        }
    })

    test("POST - Must return an valid uuid if all properties valid", async () => {
        const requestBody = {
            username: "kauan.test",
            password: "testing123",
            email: "testing.br@testing.com",
            favoriteCreator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec",
            favoriteComic: "10908bca-734f-4c17-be24-22bd4db4b2eb",
            favoriteCharacter: "ae430434-f3d5-492f-893a-78e110211a70"
        }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(200);
            const responseBody = JSON.parse(response.body);
            const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            expect(uuidRegex.test(responseBody.uuid)).toBeTruthy();
        }
    })
})

describe("/auth/sigin", () => {
    beforeAll(async () => {
        configDotenv({path: "./.env"})
    })

    test("POST - Must return a valid jwt if pass correct credentials", async () => {
        const requestBody = { password: "testing123", email: "testing.br@email.com" }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signin", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(401);
        }
    })

    test("POST - Must fail if pass incorrect credentials", async () => {
        const requestBody = { password: "testing123", email: "testing.br@email.br" }
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signin", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(401);
        }
    })
})