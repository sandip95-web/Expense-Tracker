import mongoose from "mongoose";
import { User } from "../types/types";
import validator from "validator";

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      validate: validator.isAlpha,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      validate: validator.isEmail,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
      validate: validator.isStrongPassword,
    },
    profilePicture: {
      type: String,
      default:
        "https://imgs.search.brave.com/MfCMRjbwpgFuoONjuznH5NyMPYgEXwI4nagKtkUzPOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODVlNGJmM2NiMTFi/MjI3NDkxYzMzOWEu/cG5n",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);
