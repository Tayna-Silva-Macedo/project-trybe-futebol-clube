import { StatusCodes } from 'http-status-codes';

import IMatchService from '../interfaces/IMatchService';
import IMatch from '../interfaces/IMatch';

import HttpException from '../helpers/HttpException';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService implements IMatchService {
  constructor(
    private model: typeof Matches,
    private teamsModel: typeof Teams,
  ) {}

  public async findAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public async findAllByProgress(inProgress: boolean): Promise<Matches[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  private static verifyEqualTeams(homeTeam: number, awayTeam: number): void {
    if (homeTeam === awayTeam) {
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

  public async create(
    match: Omit<Matches, 'id' | 'inProgress'>,
  ): Promise<Matches> {
    MatchesService.verifyEqualTeams(match.homeTeam, match.awayTeam);

    await this.verifyExistTeam(match.homeTeam);
    await this.verifyExistTeam(match.awayTeam);

    const matchCreated = await this.model.create({
      ...match,
      inProgress: true,
    });

    return matchCreated;
  }

  public async updateProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateGoals(id: number, goals: IMatch): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}
