import createHttpError from "http-errors";
import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { User } from "../types/types.js";

const userResolver = {
  Query: {
    authUser: async (_, __, context): Promise<User | null> => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.log("Error in auth user: ", error);
        throw new Error("Error while authenticatinUser.");
      }
    },
    users: async (
      _,
      __,
      { userId }: { userId: string }
    ): Promise<User | null> => {
      try {
        const user = await userModel.findById(userId);
        return user;
      } catch (error) {
        console.log("Error in auth user: ", error);
        throw new Error("Error while authenticating User.");
      }
    },
  },
  Mutation: {
    signup: async (_, { input }, context): Promise<User | null> => {
      try {
        const { username, email, password, gender } = input;
        if (!username || !email || !password || !gender) {
          throw createHttpError(400, "All field are required.");
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          throw createHttpError(400, "User with that email already exist.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = await userModel.create({
          username,
          email,
          password: hashedPassword,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
          gender,
        });
        await context.login(newUser);
        return newUser;
      } catch (error) {
        throw createHttpError(500, "Error while signing up user:", error);
      }
    },
    login: async (_, { input }, context): Promise<User | null> => {
      try {
        const { email, password } = input;
        if (!email || !password) {
          throw new Error("Email and password field are required.");
        }

        const { user } = await context.authenticate("graphql-local", {
          email,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        throw new Error("Error while login user:");
      }
    },
    logout: async (_, __, context): Promise<{ message: string } | null> => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged Out Successfully." };
      } catch (error) {
        throw new Error("Error while logging out: ");
      }
    },
  },
};
export default userResolver;
