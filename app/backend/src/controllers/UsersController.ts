import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  public usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.usersService.login(email, password);
    res.status(200).json({ token: result });
  };
}
