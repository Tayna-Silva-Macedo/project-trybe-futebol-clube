import { StatusCodes } from 'http-status-codes';

import IUserService from '../interfaces/services/IUserService';
import IUser from '../interfaces/IUser';

import Users from '../database/models/Users';

import HttpException from '../helpers/HttpException';
import Token from '../helpers/Token';
import Bcrypt from '../helpers/Bcryptjs';

export default class UsersService implements IUserService {
  constructor(private usersModel: typeof Users) {}

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.usersModel.findOne({ where: { email } });

    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.findByEmail(email);

    if (!user || !Bcrypt.compare(password, user.password)) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email or password',
      );
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = Token.create(payload);

    return token;
  }
}
