
import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { UserController } from './user-controller';
import { Uservalidation } from './user-validation';

const router = express.Router();

router.post('/register',ValidateRequest(Uservalidation.userValidationSchema),UserController.createUser)

router.post('/login',ValidateRequest(Uservalidation.loginValidationSchema),UserController.loginUser)



export const UserRoutes = router;