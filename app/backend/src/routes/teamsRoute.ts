import { Router } from 'express';

import Teams from '../database/models/Teams';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsService = new TeamsService(Teams);
const teamsController = new TeamsController(teamsService);

router.get('/', teamsController.findAll);

export default router;
