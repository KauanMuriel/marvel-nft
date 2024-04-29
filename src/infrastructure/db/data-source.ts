import { DataSource } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { configDotenv } from "dotenv";

configDotenv({path: "./.env"})

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    migrations: [__dirname + "/migrations/*.ts"]
})