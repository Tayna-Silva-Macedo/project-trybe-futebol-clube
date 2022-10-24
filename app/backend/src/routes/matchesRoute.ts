import { Router } from 'express';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesService = new MatchesService(Matches, Teams);
const matchesController = new MatchesController(matchesService);

router.get('/', matchesController.findAll);

router.post('/', matchesController.create);

router.patch('/:id/finish', matchesController.update);

export default router;
