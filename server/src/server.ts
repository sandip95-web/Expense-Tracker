import http from "http";
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";
import mergedResolver from "./resolvers/merge_resolver.js";
import mergedTypeDefs from "./typeDefs/merge_typeDefs.js";
import { BaseContext } from "@apollo/server";
import { config } from "./config/config.js";
import dbConnection from "./config/dbConnection.js";
import { buildContext } from "graphql-passport";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import { configurePassport } from "./config/passportConfig.js";

await dbConnection();
configurePassport();
const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: config.mongoConnectionString,
  collection: "sessions",
});
store.on("error", (err) => console.log(err));

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const port = Number(config.port);
const server = new ApolloServer<BaseContext>({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/",
  cors<cors.CorsRequest>({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return buildContext({ req, res });
    },
  })
);
app.use(globalErrorHandler);
await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/`);
