import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user_typeDefs.js";
import transactionTypeDef from "./transaction_typeDefs.js";

const mergedTypeDefs=mergeTypeDefs([userTypeDef,transactionTypeDef]);

export default mergedTypeDefs