import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog-services";
import sendResponse from "../../utils/sendresponse";

const createBlogPost = catchAsync(async (req, res) => {
  const blogData = {
    ...req.body,
    author: req.user.userId,
  };

  const result = await BlogServices.createBlog(blogData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog posted Successfully!",
    data: result,
  });
});

const upateBlogPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.UpdateBlog(id, req.body, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Updated Successfully!",
    data: result,
  });
});

const deleteBlogPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.DeleteBlog(id, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog Deleted Successfully!",
    data: result,
  });
});

export const BlogController = {
  createBlogPost,
  upateBlogPost,
  deleteBlogPost
};
