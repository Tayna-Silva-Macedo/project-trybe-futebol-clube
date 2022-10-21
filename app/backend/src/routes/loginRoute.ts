import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import loginValidation from '../middlewares/loginValidation';

const router = Router();

const usersController = new UsersController();

router.post('/', loginValidation, usersController.login);

export default router;
