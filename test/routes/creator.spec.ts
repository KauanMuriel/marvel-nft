import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

const authorizationHeader = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWU0MzA0MzQtZjNkNS00OTJmLTg5M2EtNzhlMTEwMjExYTcwIn0.YfWxVj1b6uj8MTZ_WgEKqSvLoI_tLk-zjXXoc3NcLkc"
}

describe("/creator", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("POST - Must fail if pass a duplicated fullname creator", async () => {
        const requestBody = { fullname: "Spider-Man #1", sufix: "978-1302923730", thumbnail: "said82139e1a" };
        const response = await app.fastify.inject({ method: "POST", url: "/creator", body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(409);
        }
    })

    test("PUT - Must return success if pass all properties valid", async () => {
        const requestBody = { fullname: "Kauan Muriel", sufix: "KM", thumbnail: "said82139e1a" };
        const creatorUuid = "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec";
        const response = await app.fastify.inject({ method: "PUT", url: `/creator/${creatorUuid}`, body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
        }
    })

    test("GET ALL - Must return a list of creators", async () => {
        const response = await app.fastify.inject({ method: "GET", url: `/creator`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.length).toBeGreaterThan(0);
        }
    })

    test("DELETE - Must return success if pass a valid creator uuid", async () => {
        const creatorUuid = "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec";
        const response = await app.fastify.inject({ method: "DELETE", url: `/creator/${creatorUuid}`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
        }
    })
})