import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

describe("/balance", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("GET - Must return user balance", async () => {
        const requestBody = { value: 10 };
        const response = await app.fastify.inject({ method: "GET", url: "/balance", body: requestBody });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.body).toBe({ balance : 100 });
        }
    })
})