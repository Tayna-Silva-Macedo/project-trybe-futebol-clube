import IMatchCreate from './IMatchCreate';
import ITeam from './ITeam';

export default interface IMatch extends IMatchCreate {
  id: number;
  inProgress: boolean;
  teamHome?: Omit<ITeam, 'id'>;
  teamAway?: Omit<ITeam, 'id'>;
}
