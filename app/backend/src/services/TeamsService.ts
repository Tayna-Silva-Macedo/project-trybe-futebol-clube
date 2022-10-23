import ITeamService from '../interfaces/ITeamService';
import ITeam from '../interfaces/ITeam';

import Teams from '../database/models/Teams';

export default class TeamsService implements ITeamService {
  constructor(private model: typeof Teams) {}

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }
}
