import { GraphQLError } from "graphql";
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
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transactions = await transactionMode.find({ userId });
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
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
    updateTransaction: async (_: unknown, { input }) => {
      const { transactionId, ...updateData } = input;
      try {
        console.log("Received input:", input);
        const updatedTransaction = await transactionMode.findByIdAndUpdate(
          transactionId,
          updateData,
          { new: true }
        );
        if (!updatedTransaction) {
          throw new GraphQLError("Transaction not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return updatedTransaction;
      } catch (err) {
        console.error("Error updating transaction:", err);
        throw new GraphQLError("Failed to update transaction", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
    deleteTransaction: async (
      _: unknown,
      { transactionId }
    ): Promise<Transaction | null> => {
      console.log(transactionId);
      try {
        const deleteTransaction = await transactionMode.findByIdAndDelete(
          transactionId
        );

        return deleteTransaction;
      } catch (err) {
        console.error("Error updating transaction:", err);
        throw new Error("Error updating transaction");
      }
    },
  },
};

export default transactionResolver;
