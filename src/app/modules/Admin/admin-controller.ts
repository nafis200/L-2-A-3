import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { AdminServices } from "./admin-services";
import httpStatus from "http-status";

const upateUserBlock = catchAsync(async (req, res) => {
    const { userId } = req.params; 
    const result = await AdminServices.UpdateBlog(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User blocked successfully",
      data: result,
    });
  });

  const deleteBlock = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AdminServices.DeleteBlog(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog Deleted Successfully!",
      data: result,
    });
  });

  export const BlogAdminController = {
    upateUserBlock,
    deleteBlock
  };