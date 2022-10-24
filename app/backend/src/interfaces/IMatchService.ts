import Matches from '../database/models/Matches';

export default interface IMatchService {
  findAll(): Promise<Matches[]>;
  findAllInProgress(inProgress: boolean): Promise<Matches[]>;
}
