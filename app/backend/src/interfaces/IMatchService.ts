import IMatch from './IMatch';
import IMatchCreate from './IMatchCreate';
import IMatchGoals from './IMatchGoals';

export default interface IMatchService {
  findAll(): Promise<IMatch[]>;
  findAllByProgress(inProgress: boolean): Promise<IMatch[]>;
  create(match: IMatchCreate): Promise<IMatch>;
  updateProgress(id: number): Promise<void>;
  updateGoals(id: number, goals: IMatchGoals): Promise<void>;
}
