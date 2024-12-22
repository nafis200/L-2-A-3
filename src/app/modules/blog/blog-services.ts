import AppError from "../../errors/Apperror";
import { TBlogPost } from "./blog-interface";
import { BlogPostModel } from "./blog-model";
const createBlog = async (payload: TBlogPost) => {
  if (!payload) {
    throw new Error("Blog data is null or undefined");
  }
  const newBlog = await BlogPostModel.create(payload);
  return newBlog;
};

const UpdateBlog = async (
  id: string,
  payload: Partial<TBlogPost>,
  currentUserId: string
) => {
  const ExistingId = await BlogPostModel.findById(id);
  if (!ExistingId) {
    throw new AppError(404, "Id is invalid");
  }
  const CreateId = ExistingId.author.toString();

  if (CreateId === currentUserId) {
    const result = await BlogPostModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    throw new AppError(403, "You can't update another blog");
  }
};

export const BlogServices = {
  createBlog,
  UpdateBlog,
};
