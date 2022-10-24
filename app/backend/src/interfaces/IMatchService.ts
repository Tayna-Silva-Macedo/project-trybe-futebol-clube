import Matches from '../database/models/Matches';

export default interface IMatchService {
  findAll(): Promise<Matches[]>;
  findAllByProgress(inProgress: boolean): Promise<Matches[]>;
  create(match: Omit<Matches, 'id' | 'inProgress'>): Promise<Matches>;
}
