import mongoose from "mongoose";

export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  gender: string;
}
