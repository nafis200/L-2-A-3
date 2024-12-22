
import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import userValidationSchema from './user-validation';
import { UserController } from './user-controller';

const router = express.Router();

router.post('/register',ValidateRequest(userValidationSchema),UserController.createUser)

export const UserRoutes = router;