import mongoose from "mongoose";
import { Transaction } from "../types/types";

const transactionSchema = new mongoose.Schema<Transaction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      required: [true, "Payment Type is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      default:"Unknown"
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<Transaction>("Transaction", transactionSchema);
