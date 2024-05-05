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
        const response = await app.fastify.inject({ method: "GET", url: "/balance", headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.balance).toBe(100);
        }
    })
})

describe("/balance/withdraw", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("POST - Must fail if pass zero as value", async () => {
        const requestBody = { value: "0" }
        const response = await app.fastify.inject({ method: "POST", url: "/balance/withdraw", body: requestBody, headers: authorizationHeader });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must fail if pass a negative value", async () => {
        const requestBody = { value: "-10" }
        const response = await app.fastify.inject({ method: "POST", url: "/balance/withdraw", body: requestBody, headers: authorizationHeader });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must withdraw with success", async () => {
        const requestBody = { value: "10" }
        const response = await app.fastify.inject({ method: "POST", url: "/balance/withdraw", body: requestBody, headers: authorizationHeader });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBe("Withdraw successful!");
        }
    })
})

describe("/balance/deposit", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("POST - Must fail if pass zero as value", async () => {
        const requestBody = { value: "0" }
        const response = await app.fastify.inject({ method: "POST", url: "/balance/deposit", body: requestBody, headers: authorizationHeader });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must fail if pass a negative value", async () => {
        const requestBody = { value: "-10" }
        const response = await app.fastify.inject({ method: "POST", url: "/balance/deposit", body: requestBody, headers: authorizationHeader });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.statusCode).toBe(400);
        }
    })

    test("POST - Must deposit with success", async () => {
        const requestBody = { value: "10" }
        const response = await app.fastify.inject({ method: "POST", url: "/balance/deposit", body: requestBody, headers: authorizationHeader });
        if (response) {
            const json = JSON.parse(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBe("Deposit successful!");
        }
    })
})