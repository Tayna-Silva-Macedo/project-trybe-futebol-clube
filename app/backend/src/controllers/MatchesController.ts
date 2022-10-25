import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import IMatchService from '../interfaces/IMatchService';

export default class MatchesController {
  constructor(private service: IMatchService) {}

  public findAll = async (req: Request, res: Response) => {
    let matches;
    const { inProgress } = req.query;

    if (inProgress) {
      const inProgressBool = inProgress === 'true';

      matches = await this.service.findAllByProgress(inProgressBool);
    } else {
      matches = await this.service.findAll();
    }

    return res.status(StatusCodes.OK).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const match = req.body;

    const matchCreated = await this.service.create(match);

    return res.status(StatusCodes.CREATED).json(matchCreated);
  };

  public updateProgress = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await this.service.updateProgress(id);

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  };

  public updateGoals = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const goals = req.body;

    await this.service.updateGoals(id, goals);

    return res.status(StatusCodes.OK).json({ message: 'Match updated!' });
  };
}
