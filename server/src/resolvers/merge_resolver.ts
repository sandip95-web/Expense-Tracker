import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user_resolver";
import transactionResolver from "./transaction_resolver";

const mergedResolver = mergeResolvers([userResolver, transactionResolver]);

export default mergedResolver;
