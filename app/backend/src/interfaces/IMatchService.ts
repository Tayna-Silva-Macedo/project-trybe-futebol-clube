import Matches from '../database/models/Matches';
import IMatchGoals from './IMatch';

export default interface IMatchService {
  findAll(): Promise<Matches[]>;
  findAllByProgress(inProgress: boolean): Promise<Matches[]>;
  create(match: Omit<Matches, 'id' | 'inProgress'>): Promise<Matches>;
  updateProgress(id: number): Promise<void>;
  updateGoals(id: number, goals: IMatchGoals): Promise<void>;
}
