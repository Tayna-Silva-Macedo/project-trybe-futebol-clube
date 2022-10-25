import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardService {
  generateHomeLeaderboard(): Promise<ILeaderboard[]>
}
