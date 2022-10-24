import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchesController {
  constructor(private service: IMatchService) {}

  public findAll = async (_req: Request, res: Response) => {
    const matches = await this.service.findAll();

    return res.status(200).json(matches);
  };
}
