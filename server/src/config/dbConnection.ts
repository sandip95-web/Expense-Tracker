import mongoose from "mongoose";
import { config } from "./config";

const dbConnection = async () => {
  try {
    mongoose.connection.on("connection", () => {
      console.log("Connected to the database.");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Failed to connect to database:", err);
    });
    await mongoose.connect(config.mongoConnectionString);
  } catch (error) {
    console.log("Error while Connecting to database:", error);
    process.exit(1);
  }
};
export default dbConnection;