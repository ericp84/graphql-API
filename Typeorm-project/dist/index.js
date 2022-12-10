"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const users_1 = require("../src/grapqhql/resolvers/users");
const type_graphql_1 = require("type-graphql");
const data_source_1 = __importDefault(require("./data-source"));
const timetrackings_1 = require("./grapqhql/resolvers/timetrackings");
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [users_1.UserResolver, timetrackings_1.TimetrackingResolver],
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
    });
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
    await data_source_1.default.initialize();
    console.log("connected to BDD !!!!");
}
bootstrap();
