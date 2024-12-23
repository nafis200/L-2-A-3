import AppError from "../../errors/Apperror";
import { User } from "../user/user-model";

const UpdateBlog = async (id: string) => {
  const ExistingId = await User.findById(id);

  if (!ExistingId) {
    throw new AppError(404, "Id is invalid");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );

  return updatedUser;
};

export const AdminServices = {
  UpdateBlog,
};
