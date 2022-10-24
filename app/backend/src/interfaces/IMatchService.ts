import Matches from '../database/models/Matches';

export default interface IMatchService {
  findAll(): Promise<Matches[]>;
}
