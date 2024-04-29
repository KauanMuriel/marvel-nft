import App from "./app";
import { AppDataSource } from "./infrastructure/db/data-source";

AppDataSource.initialize().then(async () => {
    await AppDataSource.runMigrations();
    await App.fastify.listen({ port: 3000, host: "0.0.0.0" })
    await App.fastify.ready();
    App.fastify.swagger();
}).catch(error => console.log(error));