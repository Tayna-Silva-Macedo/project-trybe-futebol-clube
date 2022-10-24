import { Request, Response } from 'express';
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

    return res.status(200).json(matches);
  };
}
