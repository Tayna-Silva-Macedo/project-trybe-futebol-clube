import { StatusCodes } from 'http-status-codes';
import IMatchService from '../interfaces/IMatchService';

import HttpException from '../helpers/HttpException';

import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService implements IMatchService {
  constructor(private model: typeof Matches) {}

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

  public async create(
    match: Omit<Matches, 'id' | 'inProgress'>,
  ): Promise<Matches> {
    if (match.homeTeam === match.awayTeam) {
      throw new HttpException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'It is not possible to create a match with two equal teams',
      );
    }

    const matchCreated = await this.model.create({
      ...match,
      inProgress: true,
    });

    return matchCreated;
  }

  public async update(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
