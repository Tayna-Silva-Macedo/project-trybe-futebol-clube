import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import IUserService from '../interfaces/IUserService';

export default class UsersController {
  constructor(private service: IUserService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.service.login(email, password);

    return res.status(StatusCodes.OK).json({ token });
  };

  public getRole = async (_req: Request, res: Response) => {
    const { role } = res.locals;

    return res.status(200).json({ role });
  };
}
