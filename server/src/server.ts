import http from 'http';
import express from 'express';
import cors from 'cors';
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mergedResolver from "./resolvers/merge_resolver.js";
import mergedTypeDefs from "./typeDefs/merge_typeDefs.js";
import { BaseContext } from "@apollo/server";
import { config } from "./config/config.js";


const app=express()

const httpServer = http.createServer(app);

const port = Number(config.port);
const server = new ApolloServer<BaseContext>({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port }, resolve),
);
console.log(`🚀 Server ready at http://localhost:${port}/`);