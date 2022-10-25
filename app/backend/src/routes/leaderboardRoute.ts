import { Router } from 'express';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const router = Router();

const leaderboardService = new LeaderboardService(Teams, Matches);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', leaderboardController.findAllHome);
router.get('/away', leaderboardController.findAllAway);
router.get('/', leaderboardController.findAll);

export default router;
