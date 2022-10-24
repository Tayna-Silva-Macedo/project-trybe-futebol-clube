import IMatchGoals from './IMatchGoals';

export default interface IMatchCreate extends IMatchGoals {
  homeTeam: number;
  awayTeam: number;
}
