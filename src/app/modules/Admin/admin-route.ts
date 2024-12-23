import express from "express";
import { BlogAdminController } from "./admin-controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// router.patch('/:id', ValidateRequest(BlogValidation.BlogUpdateValidation),auth(USER_ROLE.user),BlogController.upateBlogPost)

router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  BlogAdminController.upateUserBlock
);

export const AdminRoutes = router;
