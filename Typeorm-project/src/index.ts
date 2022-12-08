import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "../src/grapqhql/resolvers/users";
import { buildSchema } from "type-graphql";
import datasource from "./data-source";
import { TimetrackingResolver } from "./grapqhql/resolvers/timetrackings";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver, TimetrackingResolver],
  });
  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
  await datasource.initialize();
  console.log("connected to BDD !!!!");
}
bootstrap();
