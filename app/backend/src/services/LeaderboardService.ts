import ILeaderboardService from '../interfaces/services/ILeaderboardService';
import ILeaderboard from '../interfaces/ILeaderboard';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import generateLeaderboard from '../utils/leaderboard';

export default class LeaderboardService implements ILeaderboardService {
  constructor(
    private teamsModel: typeof Teams,
    private matchesModel: typeof Matches,
  ) {}

  private static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn,
    );

    return leaderboard;
  }

  private async findAllTeamsAndFinishedMatches() {
    const teams = await this.teamsModel.findAll();
    const matches = await this.matchesModel.findAll({
      where: { inProgress: false },
    });

    return { teams, matches };
  }

  public async generateHomeLeaderboard(): Promise<ILeaderboard[]> {
    const { teams, matches } = await this.findAllTeamsAndFinishedMatches();

    const homeLeaderboard = teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeam === team.id);
      return {
        name: team.teamName,
        ...generateLeaderboard(homeMatches, team.id),
      };
    });

    const sortedHomeLeaderboard = LeaderboardService.sortLeaderboard(homeLeaderboard);

    return sortedHomeLeaderboard;
  }

  public async generateAwayLeaderboard(): Promise<ILeaderboard[]> {
    const { teams, matches } = await this.findAllTeamsAndFinishedMatches();

    const awayLeaderboard = teams.map((team) => {
      const awayMatches = matches.filter((match) => match.awayTeam === team.id);
      return {
        name: team.teamName,
        ...generateLeaderboard(awayMatches, team.id),
      };
    });

    const sortedAwayLeaderboard = LeaderboardService.sortLeaderboard(awayLeaderboard);

    return sortedAwayLeaderboard;
  }

  public async generateLeaderboard(): Promise<ILeaderboard[]> {
    const { teams, matches } = await this.findAllTeamsAndFinishedMatches();

    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      ...generateLeaderboard(matches, team.id),
    }));

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }
}
