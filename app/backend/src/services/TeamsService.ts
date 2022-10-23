import { StatusCodes } from 'http-status-codes';
import ITeamService from '../interfaces/ITeamService';
import ITeam from '../interfaces/ITeam';

import HttpException from '../helpers/HttpException';

import Teams from '../database/models/Teams';

export default class TeamsService implements ITeamService {
  constructor(private model: typeof Teams) {}

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  public async findById(id: number): Promise<ITeam> {
    const team = await this.model.findByPk(id);

    if (!team) throw new HttpException(StatusCodes.NOT_FOUND, 'Team not found');

    return team;
  }
}
