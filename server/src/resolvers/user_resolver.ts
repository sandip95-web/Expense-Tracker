import { users } from "../data/_db.js";

const userResolver = {
  Query: {
    users() {
      return users;
    },
    user(_,args:{userId:string}){
      return users.find((e)=>e._id === args.userId);
    }
  },
  Mutation: {},
};
export default userResolver;
