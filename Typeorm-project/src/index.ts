import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "../src/grapqhql/resolvers/users";
import { buildSchema } from "type-graphql";
import datasource from "./data-source";
import { TimetrackingResolver } from "./grapqhql/resolvers/timetrackings";
import { TaskResolver } from "./grapqhql/resolvers/tasks";
import { CustomerResolver } from "./grapqhql/resolvers/customers";
import { CaseResolver } from "./grapqhql/resolvers/cases";
import { ProjectResolver } from "./grapqhql/resolvers/projects";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TimetrackingResolver,
      TaskResolver,
      CustomerResolver,
      CaseResolver,
      ProjectResolver,
    ],
  });
  const server = new ApolloServer({
    schema,
  });

  await datasource.initialize();
  console.log("✨ connection to DB established ✨");
  const { url } = await server.listen(PORT);
  console.log(
    `🖥️  Server is running, GraphQL Playground available at ${url} 🖥️`
  );
}
bootstrap();
