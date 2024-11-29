import mongoose from "mongoose";
import { User } from "../types/types";

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

export default mongoose.model<User>('User',userSchema);