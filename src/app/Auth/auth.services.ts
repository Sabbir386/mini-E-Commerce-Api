
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import AppError from "../errors/AppError";
import config from "../config";


const registerUser = async (payload: any) => {
  const exists = await User.findOne({ email: payload.email });

  if (exists) {
    throw new AppError(httpStatus.CONFLICT, "Email already exists");
  }

  const user = await User.create(payload);

  return user;
};

const loginUser = async (payload: any) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const match = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!match) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    config.jwt_access_secret as string,
    { expiresIn: "7d" }
  );

  return {
    token,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
