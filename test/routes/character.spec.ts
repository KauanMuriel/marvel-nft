import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

describe("/character", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("POST - Must fail if pass a duplicated name character", async () => {
        const requestBody = { name: "Spider-man", description: "A man who was bitten by a spider", thumbnail: "c3BpZGVybWFu" };
        const response = await app.fastify.inject({ method: "POST", url: "/character", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(409);
        }
    })

    test("POST - Must fail if don't pass name", async () => {
        const requestBody = { description: "A man who has metal claws", thumbnail: "c3BpZGVybWFu" };
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("Must fail if don't pass thumbnail", async () => {
        const requestBody = { name: "Wolverine", description: "A man who has metal claws"};
        const response = await app.fastify.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must return a valid uuid if pass a valid character", async () => {
        const requestBody = { name: "Wolverine", description: "A man who has metal claws", thumbnail: "c3BpZGVybWFu" };
        const response = await app.fastify.inject({ method: "POST", url: "/character", body: requestBody });
        if (response) {
            expect(response.statusCode).toBe(201);
            const json = JSON.parse(response.body);
            const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            expect(uuidRegex.test(json.uuid)).toBeTruthy();
        }
    })
})