import { Router } from 'express';

import leaderboardController from '../utils/instances/leaderboardController';

const router = Router();

router.get('/home', leaderboardController.findAllHome);
router.get('/away', leaderboardController.findAllAway);
router.get('/', leaderboardController.findAll);

export default router;
