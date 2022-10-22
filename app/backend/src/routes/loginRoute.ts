import { Router } from 'express';

import UsersController from '../controllers/UsersController';

import loginValidation from '../middlewares/loginValidation';
import auth from '../middlewares/auth';

const router = Router();

const usersController = new UsersController();

router.post('/', loginValidation, usersController.login);
router.get('/validate', auth, usersController.getRole);

export default router;
