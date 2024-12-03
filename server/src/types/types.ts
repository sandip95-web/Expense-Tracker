import mongoose, { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  gender: string;
}
export interface Transaction {
  _id: string;
  userId:mongoose.Schema.Types.ObjectId;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location: string;
  date: Date;
  transactionId?:string;
}
