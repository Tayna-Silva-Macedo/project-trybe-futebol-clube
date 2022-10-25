import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class LeaderboardController {
  constructor(private service: ILeaderboardService) {}

  public findAllHome = async (_req: Request, res: Response) => {
    const homeLeaderboard = await this.service.generateHomeLeaderboard();

    return res.status(200).json(homeLeaderboard);
  };

  public findAllAway = async (_req: Request, res: Response) => {
    const awayLeaderboard = await this.service.generateAwayLeaderboard();

    return res.status(200).json(awayLeaderboard);
  };
}
