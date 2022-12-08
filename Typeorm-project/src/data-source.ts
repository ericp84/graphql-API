import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../src/grapqhql/entities/user";
import * as dotenv from "dotenv";
dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_URL,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["query", "error"],
  entities: [User],
});

export default dataSource;
