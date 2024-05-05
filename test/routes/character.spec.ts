import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

const authorizationHeader = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWU0MzA0MzQtZjNkNS00OTJmLTg5M2EtNzhlMTEwMjExYTcwIn0.YfWxVj1b6uj8MTZ_WgEKqSvLoI_tLk-zjXXoc3NcLkc"
}

describe("/character", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("POST - Must fail if pass a duplicated name character", async () => {
        const requestBody = { name: "Spider-Man", description: "A man who was bitten by a spider", thumbnail: "c3BpZGVybWFu" };
        const response = await app.fastify.inject({ method: "POST", url: "/character", body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(409);
        }
    })

    test("PUT - Must return success if pass all properties valid", async () => {
        const requestBody = { name: "Spider-Man", description: "A man who was bitten by a spider", thumbnail: "c3BpZGVybWFu" };
        const characterUuid = "ae430434-f3d5-492f-893a-78e110211a70";
        const response = await app.fastify.inject({ method: "PUT", url: `/character/${characterUuid}`, body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
        }
    })

    test("GET - Must return the correspondent character", async () => {
        const characterUuid = "ae430434-f3d5-492f-893a-78e110211a70";
        const response = await app.fastify.inject({ method: "GET", url: `/character/${characterUuid}`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.uuid).toBe("ae430434-f3d5-492f-893a-78e110211a70");
        }
    })

    test("GET ALL - Must return a list of characters", async () => {
        const response = await app.fastify.inject({ method: "GET", url: `/character`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.length).toBeGreaterThan(0);
        }
    })

    test("DELETE - Must return success if pass a valid token uuid", async () => {
        const characterUuid = "ae430434-f3d5-492f-893a-78e110211a70";
        const response = await app.fastify.inject({ method: "DELETE", url: `/character/${characterUuid}`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
        }
    })
})