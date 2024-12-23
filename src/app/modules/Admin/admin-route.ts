import express from "express";
import { BlogAdminController } from "./admin-controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();


router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  BlogAdminController.upateUserBlock
);

router.delete('/blogs/:id',auth(USER_ROLE.admin),BlogAdminController.deleteBlock)

export const AdminRoutes = router;
