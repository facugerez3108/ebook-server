import express from 'express';
import categoryController from '../controllers/category.controller';
import { categoryValidation } from '../validations';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .route('/')
  .post(validate(categoryValidation.create), categoryController.createCategory)
  .get(validate(categoryValidation.getCategories), categoryController.getCategories);

router
    .route('/:id')
    .get(validate(categoryValidation.getCategory), categoryController.getCategory)
    .patch(validate(categoryValidation.updateCategory), categoryController.updateCategory)
    .delete(validate(categoryValidation.deleteCategory), categoryController.deleteCategory)


export default router;
