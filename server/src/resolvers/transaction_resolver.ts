import transactionMode from "../model/transactionMode.js";
import { Transaction, User } from "../types/types.js";

const transactionResolver = {
  Query: {
    transactions: async (
      _: unknown,
      __: unknown,
      context: { getUser: () => User | null }
    ): Promise<Transaction[] | null> => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const userId = context.getUser()._id;
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
      _: unknown,
      { transactionId }: { transactionId: string }
    ): Promise<Transaction | null> => {
      try {
        const transaction = await transactionMode.findById(transactionId);
        if (!transaction) {
          return null;
        }
        return transaction;
      } catch (error) {
        console.log("Error getting Transaction: ", error);
        throw new Error("Error getting Transaction.");
      }
    },
  },
  Mutation: {
    createTransaction: async (
      _: unknown,
      { input },
      context: { getUser: () => User | null }
    ): Promise<Transaction | null> => {
      try {
        const newTransaction = await transactionMode.create({
          ...input,
          userId: context.getUser()._id,
        });

        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
  },
};

export default transactionResolver;
