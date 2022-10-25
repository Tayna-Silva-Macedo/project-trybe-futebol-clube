import { Router } from 'express';

import matchesController from '../utils/instances/matchesController';

import auth from '../middlewares/auth';

const router = Router();

router.get('/', matchesController.findAll);

router.post('/', auth, matchesController.create);

router.patch('/:id/finish', matchesController.updateProgress);
router.patch('/:id', matchesController.updateGoals);

export default router;
