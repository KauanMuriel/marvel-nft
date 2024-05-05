import "reflect-metadata";
import app from "../../src/app"
import { beforeAll, describe, expect, test } from '@jest/globals'
import { configDotenv } from "dotenv";

const authorizationHeader = {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWU0MzA0MzQtZjNkNS00OTJmLTg5M2EtNzhlMTEwMjExYTcwIn0.YfWxVj1b6uj8MTZ_WgEKqSvLoI_tLk-zjXXoc3NcLkc"
}

describe("/comic", () => {
    beforeAll(async () => {
        configDotenv({ path: "./.env" })
    })

    test("POST - Must fail if pass a duplicated title comic", async () => {
        const requestBody = { title: "Spider-Man #1", isbn: "978-1302923730", creator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec" };
        const response = await app.fastify.inject({ method: "POST", url: "/comic", body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(400);
        }
    })

    test("PUT - Must return success if pass all properties valid", async () => {
        const requestBody = { title: "Spider-Man #2", isbn: "978-1302923731", creator: "5e3a9c10-a900-4ffb-ab22-5af49b8ac0ec" };
        const comicUuid = "10908bca-734f-4c17-be24-22bd4db4b2eb";
        const response = await app.fastify.inject({ method: "PUT", url: `/comic/${comicUuid}`, body: requestBody, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
        }
    })

    test("GET - Must return the correspondent comic", async () => {
        const comicUuid = "10908bca-734f-4c17-be24-22bd4db4b2eb";
        const response = await app.fastify.inject({ method: "GET", url: `/comic/${comicUuid}`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.uuid).toBe("10908bca-734f-4c17-be24-22bd4db4b2eb");
        }
    })

    test("GET ALL - Must return a list of comics", async () => {
        const response = await app.fastify.inject({ method: "GET", url: `/comic`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
            const json = JSON.parse(response.body);
            expect(json.length).toBeGreaterThan(0);
        }
    })

    test("DELETE - Must return success if pass a valid comic uuid", async () => {
        const comicUuid = "10908bca-734f-4c17-be24-22bd4db4b2eb";
        const response = await app.fastify.inject({ method: "DELETE", url: `/comic/${comicUuid}`, headers: authorizationHeader });
        if (response) {
            expect(response.statusCode).toBe(200);
        }
    })
})