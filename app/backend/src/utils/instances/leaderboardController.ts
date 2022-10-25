import Matches from '../../database/models/Matches';
import Teams from '../../database/models/Teams';

import LeaderboardService from '../../services/LeaderboardService';
import LeaderboardController from '../../controllers/LeaderboardController';

const leaderboardController = (): LeaderboardController => {
  const leaderboardService = new LeaderboardService(Teams, Matches);

  return new LeaderboardController(leaderboardService);
};

export default leaderboardController();
