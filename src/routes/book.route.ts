import express from 'express';
import bookController from '../controllers/book.controller';
import validate from '../middlewares/validate';
import { bookValidation } from '../validations';

const router = express.Router();


router
    .route('/')
    .post(validate(bookValidation.createBook), bookController.createBook)
    .get(validate(bookValidation.getBooks), bookController.getBooks);


router
    .route('/:bookId')
    .get(validate(bookValidation.getBook), bookController.getBook)
    .patch(validate(bookValidation.editBook), bookController.editBook)
    .delete(validate(bookValidation.deleteBook), bookController.deleteBook);    


export default router;