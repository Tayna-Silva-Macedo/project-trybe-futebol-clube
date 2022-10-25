import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ILeaderboardService from '../interfaces/services/ILeaderboardService';

export default class LeaderboardController {
  constructor(private service: ILeaderboardService) {}

  public findAllHome = async (_req: Request, res: Response) => {
    const homeLeaderboard = await this.service.generateHomeLeaderboard();

    return res.status(StatusCodes.OK).json(homeLeaderboard);
  };

  public findAllAway = async (_req: Request, res: Response) => {
    const awayLeaderboard = await this.service.generateAwayLeaderboard();

    return res.status(StatusCodes.OK).json(awayLeaderboard);
  };

  public findAll = async (_req: Request, res: Response) => {
    const leaderboard = await this.service.generateLeaderboard();

    return res.status(StatusCodes.OK).json(leaderboard);
  };
}
