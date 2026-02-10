import { User } from "./user.model";

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  deleteUser,
};
