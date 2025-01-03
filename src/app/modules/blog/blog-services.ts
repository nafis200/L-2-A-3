import QueryBuilder from "../../builders/Querybuilders";
import AppError from "../../errors/Apperror";
import { User } from "../user/user-model";
import { TBlogPost } from "./blog-interface";
import { BlogPostModel } from "./blog-model";
import { BlogSearchField } from "./blog.constant";
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
  currentUserEmail: string
) => {
  const ExistingId = await BlogPostModel.findById(id);

  if (!ExistingId) {
    throw new AppError(404, "Id is invalid");
  }
  const CreateId = ExistingId.author.toString();

  const IDs = await User.findById(CreateId);

  const CurrentEmail = IDs?.email;

  if (CurrentEmail === currentUserEmail) {
    const result = await BlogPostModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    throw new AppError(403, "You can't update another blog");
  }
};

const DeleteBlog = async (id: string, currentUserEmail: string) => {
  const existingBlog = await BlogPostModel.findById(id);
  if (!existingBlog) {
    throw new AppError(404, "Blog not found");
  }
  const authorId = existingBlog.author.toString();

  const IDs = await User.findById(authorId);

  const CurrentEmail = IDs?.email;

  if (CurrentEmail === currentUserEmail) {
    const result = await BlogPostModel.findByIdAndDelete(id);
    return result;
  } else {
    throw new AppError(403, "You can't delete another user's blog");
  }
};

const getAllBlog = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BlogPostModel.find(), query)
    .search(BlogSearchField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery.populate("author");
  return result;
};

export const BlogServices = {
  createBlog,
  UpdateBlog,
  DeleteBlog,
  getAllBlog,
};
