import { Router } from 'express';

import teamsController from '../utils/instances/teamsController';

const router = Router();

router.get('/', teamsController.findAll);
router.get('/:id', teamsController.findById);

export default router;
