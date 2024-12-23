import AppError from "../../errors/Apperror";
import { BlogPostModel } from "../blog/blog-model";
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

const DeleteBlog = async (id: string) => {
  const existingBlog = await BlogPostModel.findById(id);
  if (!existingBlog) {
    throw new AppError(404, "Blog not found");
  }

  const result = await BlogPostModel.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  UpdateBlog,
  DeleteBlog
};
