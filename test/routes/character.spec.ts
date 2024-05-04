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
})