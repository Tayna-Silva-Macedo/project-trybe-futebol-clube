import { StatusCodes } from 'http-status-codes';

import IUserService from '../interfaces/IUserService';
import IUser from '../interfaces/IUser';

import HttpException from '../helpers/HttpException';
import Token from '../helpers/Token';
import Bcrypt from '../helpers/Bcryptjs';

import Users from '../database/models/Users';

export default class UsersService implements IUserService {
  constructor(private model: typeof Users) {}

  public async findByEmail(email: string): Promise<IUser | null> {
    const result = await this.model.findOne({ where: { email } });

    return result;
  }

  public async login(email: string, password: string): Promise<string> {
    const result = await this.findByEmail(email);

    if (!result || !Bcrypt.compare(password, result.password)) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email or password',
      );
    }

    const payload = {
      id: result.id,
      username: result.username,
      role: result.role,
      email: result.email,
    };

    const token = Token.create(payload);

    return token;
  }
}
