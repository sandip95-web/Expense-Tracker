import { users } from "../data/_db";

const userResolver = {
  Query: {
    users() {
      return users;
    },
  },
  Mutation: {},
};
export default userResolver;
