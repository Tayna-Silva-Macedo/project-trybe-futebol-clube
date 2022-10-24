import IMatchService from '../interfaces/IMatchService';

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
}
