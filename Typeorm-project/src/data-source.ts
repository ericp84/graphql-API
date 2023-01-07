import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../src/grapqhql/entities/user";
import * as dotenv from "dotenv";
import { Timetracking } from "./grapqhql/entities/timetracking";
import { Task } from "./grapqhql/entities/task";
import { Customer } from "./grapqhql/entities/customer";
import { Case } from "./grapqhql/entities/case";
import { Project } from "./grapqhql/entities/project";
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
  entities: [User, Timetracking, Task, Customer, Case, Project],
});

export default dataSource;
