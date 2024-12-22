import type { TUser } from "./user-interface";
import { User } from "./user-model";

const RegisterUser = async (payload: TUser) => {
  
  if (!payload) {
    throw new Error("User is undefined or null");
  }

  const existingUser = await User.findOne({ email: payload.email });  

  if (existingUser) {
    throw new Error("Email already exist");
  }
  const newUser = new User(payload);
  await newUser.save();
  return newUser;
};

export const UserServices = {
  RegisterUser,
};
