import express from 'express';
import validate from '../middlewares/validate';
import prestamoController from '../controllers/prestamo.controller';
import prestamoValidation from '../validations/prestamo.validation';


const router = express.Router();

router
    .route('/')
    .post(validate(prestamoValidation.createPrestamo), prestamoController.createPrestamo)
    .get(validate(prestamoValidation.getPrestamos), prestamoController.getPrestamos);


router
    .route('/:id')
    .get(validate(prestamoValidation.getPrestamo), prestamoController.getPrestamo)
    .patch(validate(prestamoValidation.updatePrestamo), prestamoController.updatePrestamo)
    .delete(validate(prestamoValidation.deletePrestamo), prestamoController.deletePrestamo);

export default router;