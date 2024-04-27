import App from "./app";
import { AppDataSource } from "./insfrastructure/db/data-source";

AppDataSource.initialize().then(async () => {
    await AppDataSource.runMigrations();
    await App.listen({ port: 3000, host: "0.0.0.0" })
    await App.ready();
    App.swagger();
}).catch(error => console.log(error));