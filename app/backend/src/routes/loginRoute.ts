import { Router } from 'express';

import usersController from '../utils/instances/usersController';

import loginValidation from '../middlewares/loginValidation';
import auth from '../middlewares/auth';

const router = Router();

router.post('/', loginValidation, usersController.login);

router.get('/validate', auth, usersController.getRole);

export default router;
