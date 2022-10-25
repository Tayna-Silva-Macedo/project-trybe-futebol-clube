import Matches from '../../database/models/Matches';
import Teams from '../../database/models/Teams';

import MatchesService from '../../services/MatchesService';
import MatchesController from '../../controllers/MatchesController';

const matchesController = (): MatchesController => {
  const matchesService = new MatchesService(Matches, Teams);

  return new MatchesController(matchesService);
};

export default matchesController();
