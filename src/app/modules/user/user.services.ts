import config from "../../config";
import AppError from "../../errors/Apperror";
import type { TLoginUser, TUser } from "./user-interface";
import { User } from "./user-model";
import httpStatus from "http-status";

import { createToken } from "./user.utils";

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

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);  

  const isBlocked = user?.isBlocked;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  const jwtPayload = {
    userId: user?._id?.toString() ?? "default_id",
    useremail: user?.email ?? "default_email",      
    role: user?.role ?? "user",                     
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
  };
};

export const UserServices = {
  RegisterUser,
  loginUser,
};
