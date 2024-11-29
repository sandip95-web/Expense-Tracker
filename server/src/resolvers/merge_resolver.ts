import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user_resolver.js";
import transactionResolver from "./transaction_resolver.js";

const mergedResolver = mergeResolvers([userResolver, transactionResolver]);

export default mergedResolver;
