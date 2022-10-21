import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/UsersService';

export default class UsersController {
  public usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.usersService.login(email, password);
    res.status(StatusCodes.OK).json({ token: result });
  };
}
