import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { UserServices } from "./user.services";
import httpStatus from 'http-status';
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.RegisterUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
};
