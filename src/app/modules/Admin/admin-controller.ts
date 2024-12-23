import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { AdminServices } from "./admin-services";
import httpStatus from "http-status";

const upateUserBlock = catchAsync(async (req, res) => {
    const { userId } = req.params; 
    console.log(userId);
    
    const result = await AdminServices.UpdateBlog(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User blocked successfully",
      data: result,
    });
  });

  export const BlogAdminController = {
    upateUserBlock
  };