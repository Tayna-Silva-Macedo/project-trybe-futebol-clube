import ITeam from './ITeam';

export default interface ITeamService {
  findAll(): Promise<ITeam[]>;
}
