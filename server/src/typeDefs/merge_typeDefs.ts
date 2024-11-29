import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user_typeDefs";
import transactionTypeDef from "./transaction_typeDefs";

const mergedTypeDefs=mergeTypeDefs([userTypeDef,transactionTypeDef]);

export default mergedTypeDefs