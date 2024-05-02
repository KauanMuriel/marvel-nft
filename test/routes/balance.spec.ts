import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

const authorizationHeader = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWU0MzA0MzQtZjNkNS00OTJmLTg5M2EtNzhlMTEwMjExYTcwIn0.YfWxVj1b6uj8MTZ_WgEKqSvLoI_tLk-zjXXoc3NcLkc"
}

describe("/balance", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("GET - Must return user balance", async () => {
        const requestBody = { value: 10 };
        const response = await app.fastify.inject({ method: "GET", url: "/balance", body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.balance).toBe(100);
        }
    })
})