import { StatusCodes } from 'http-status-codes';

import IMatchService from '../interfaces/services/IMatchService';
import IMatch from '../interfaces/IMatch';
import IMatchGoals from '../interfaces/IMatchGoals';
import IMatchCreate from '../interfaces/IMatchCreate';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import HttpException from '../helpers/HttpException';

export default class MatchesService implements IMatchService {
  constructor(
    private matchesModel: typeof Matches,
    private teamsModel: typeof Teams,
  ) {}

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public async findAllByProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  private static verifyEqualTeams(homeTeamId: number, awayTeamId: number): void {
    if (homeTeamId === awayTeamId) {
      throw new HttpException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'It is not possible to create a match with two equal teams',
      );
    }
  }

  private async verifyExistTeam(teamId: number): Promise<void> {
    const team = await this.teamsModel.findByPk(teamId);

    if (!team) {
      throw new HttpException(
        StatusCodes.NOT_FOUND,
        'There is no team with such id!',
      );
    }
  }

  public async create(match: IMatchCreate): Promise<IMatch> {
    MatchesService.verifyEqualTeams(match.homeTeam, match.awayTeam);

    await this.verifyExistTeam(match.homeTeam);
    await this.verifyExistTeam(match.awayTeam);

    const matchCreated = await this.matchesModel.create({
      ...match,
      inProgress: true,
    });

    return matchCreated;
  }

  public async updateProgress(id: number): Promise<void> {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateGoals(id: number, goals: IMatchGoals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await this.matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}
