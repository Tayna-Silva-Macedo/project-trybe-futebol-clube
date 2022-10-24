import { Router } from 'express';

import Matches from '../database/models/Matches';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAll);

router.post('/', matchesController.create);

export default router;
