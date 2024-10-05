import express from 'express';
import clientController from '../controllers/client.controller';
import validate from '../middlewares/validate';
import { clientValidation } from '../validations';

const router = express.Router();

router
  .route('/')
  .post(validate(clientValidation.createClient), clientController.createClient)
  .get(validate(clientValidation.getClients), clientController.getClients);

router
  .route('/:id')
  .get(validate(clientValidation.getClient), clientController.getClient)
  .patch(validate(clientValidation.editClient), clientController.updateClient)
  .delete(validate(clientValidation.deleteClient), clientController.deleteClient);

export default router;