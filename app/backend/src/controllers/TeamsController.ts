import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamsController {
  constructor(private service: ITeamService) {}

  public findAll = async (_req: Request, res: Response) => {
    const teams = await this.service.findAll();

    res.status(200).json(teams);
  };
}
