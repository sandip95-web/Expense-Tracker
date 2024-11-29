import passport from "passport";
import { User } from "../types/types";
import userModel from "../model/userModel";
import { GraphQLLocalStrategy } from "graphql-passport";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { ObjectId } from "mongoose";

export const configurePassport = async () => {
  passport.serializeUser((user: User, done) => {
    console.log("Serializing User");
    done(null, user._id);
  });
  passport.deserializeUser(async (id: ObjectId, done) => {
    console.log("Deserializing User");
    try {
      const user = await userModel.findOne(id);
      done(null, user);
    } catch (error) {
      console.log(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (email: string, password: string, done) => {
      try {
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
          throw createHttpError(400, "User with that email doen't exist");
        }
        const validatePassword = await bcrypt.compare(
          password,
          userExist.password
        );
        if (!validatePassword) {
          throw createHttpError(400, "Invalid username or password.");;
        }
        return done(null, userExist);
      } catch (error) {
        return done(error);
      }
    })
  );
};
