import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mergedResolver from "./resolvers/merge_resolver";
import mergedTypeDefs from "./typeDefs/merge_typeDefs";
import { BaseContext } from "@apollo/server";

config();



const port = Number(process.env.PORT) || 4444;
const server = new ApolloServer<BaseContext>({
  typeDefs: mergedTypeDefs,
  resolvers:mergedResolver,
});
startStandaloneServer(server, {
  listen: {
    port,
  },
})
  .then(() => {
    console.log(`Server staring on PORT : ${port}`);
  })
  .catch((err) => console.error(err));
