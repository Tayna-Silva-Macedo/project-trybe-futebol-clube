import { StatusCodes } from 'http-status-codes';

import ITeamService from '../interfaces/services/ITeamService';
import ITeam from '../interfaces/ITeam';

import Teams from '../database/models/Teams';

import HttpException from '../helpers/HttpException';

export default class TeamsService implements ITeamService {
  constructor(private teamsModel: typeof Teams) {}

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.teamsModel.findAll();

    return teams;
  }

  public async findById(id: number): Promise<ITeam> {
    const team = await this.teamsModel.findByPk(id);

    if (!team) throw new HttpException(StatusCodes.NOT_FOUND, 'Team not found');

    return team;
  }
}
