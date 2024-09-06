import express from 'express';
import auth from '../middlewares/auth';
import userController from '../controllers/user.controller';
import validate from '../middlewares/validate';
import { userValidation } from '../validations';


const router = express.Router();


router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(auth(), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/role')
  .get(validate(userValidation.getUser), userController.getUserRoleCtlr)

router
    .route('/:userId')
    .get(auth(), validate(userValidation.getUser), userController.getUser)
    .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser);


export default router;