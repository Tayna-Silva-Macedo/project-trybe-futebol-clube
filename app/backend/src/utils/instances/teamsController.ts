import Teams from '../../database/models/Teams';

import TeamsService from '../../services/TeamsService';
import TeamsController from '../../controllers/TeamsController';

const teamsController = (): TeamsController => {
  const teamsService = new TeamsService(Teams);

  return new TeamsController(teamsService);
};

export default teamsController();
