import { Router } from 'express';

import Users from '../database/models/Users';
import UsersService from '../services/UsersService';
import UsersController from '../controllers/UsersController';

import loginValidation from '../middlewares/loginValidation';
import auth from '../middlewares/auth';

const router = Router();

const usersService = new UsersService(Users);
const usersController = new UsersController(usersService);

router.post('/', loginValidation, usersController.login);
router.get('/validate', auth, usersController.getRole);

export default router;
