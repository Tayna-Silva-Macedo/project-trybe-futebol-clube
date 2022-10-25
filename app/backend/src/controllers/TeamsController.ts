import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ITeamService from '../interfaces/ITeamService';

export default class TeamsController {
  constructor(private service: ITeamService) {}

  public findAll = async (_req: Request, res: Response) => {
    const teams = await this.service.findAll();

    return res.status(StatusCodes.OK).json(teams);
  };

  public findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const team = await this.service.findById(id);

    return res.status(StatusCodes.OK).json(team);
  };
}
