import { users } from "../data/_db.js";
import transactionMode from "../model/transactionMode.js";
import { Transaction } from "../types/types.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context): Promise<Transaction[] | null> => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = await context.getUser()._id;
        const transactions = await transactionMode.find({ userId });
        if (!transactions || transactions.length === 0) {
          return null;
        }
        return transactions;
      } catch (error) {
        console.log("Error getting Transactions: ", error);
        throw new Error("Error getting Transactions.");
      }
    },
    transaction: async (
      _,
      { transactionId }: { transactionId: string }
    ): Promise<Transaction | null> => {
      try {
        const transaction = await transactionMode.findById(transactionId);
        if (!transaction) {
          return null; // No transaction found with the given transactionId
        }
        return transaction;
      } catch (error) {
        console.log("Error getting Transaction: ", error);
        throw new Error("Error getting Transaction.");
      }
    },
  },
  Mutation: {},
};

export default transactionResolver;
