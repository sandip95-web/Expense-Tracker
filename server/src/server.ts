import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./graphql/schema/schemas";
import axios from "axios";
import { getUser, getUserPost, getUsers, getUserTodos } from "./controllers/userController";
config();
// const serverStart = async () => {
//   const port = process.env.PORT || 4444;

//   app.listen(port, () => {
//     console.log(`Listening from Port: ${port}`);
//   });
// };

// serverStart();
const port = Number(process.env.PORT) || 4444;
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      users: getUsers,
      user:getUser
    },
    User:{
      post:getUserPost,
      todo:getUserTodos 
    },
  },
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
