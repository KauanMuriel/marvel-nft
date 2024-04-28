import app from "../../src/app"
import { describe, expect, test } from '@jest/globals'

describe("/auth/signup", () => {
    test("Must fail if don't pass email", async () => {
        const requestBody = { username: "kauan.rossi", password: "testing123"};
        const response = await app.inject({ method: "POST", url: "/auth/signup", body: requestBody});
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("Must pass with all properties valid", async () => {
        const requestBody = { username: "kauan.rossi", password: "testing123", email: "testing.br@email.com"}
        const response = await app.inject({ method: "POST", url: "/auth/signup", body: requestBody });
        if (response) {
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        }
    })
})