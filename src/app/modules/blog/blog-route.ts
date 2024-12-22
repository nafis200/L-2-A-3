
import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { BlogValidation } from './blog-validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { BlogController } from './blog-controller';
;

const router = express.Router();

router.post('/',ValidateRequest(BlogValidation.BlogValidationSchema),auth(USER_ROLE.user,USER_ROLE.admin),BlogController.createBlogPost)

router.patch('/:id', ValidateRequest(BlogValidation.BlogUpdateValidation),auth(USER_ROLE.user),BlogController.upateBlogPost)

router.delete('/:id',auth(USER_ROLE.user),BlogController.deleteBlogPost)

router.get('/',BlogController.getAllBlogPost)


export const BlogRoutes = router;