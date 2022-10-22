import { StatusCodes } from 'http-status-codes';
import HttpException from '../helpers/HttpExpection';
import Token from '../helpers/Token';
import Bcrypt from '../helpers/Bcryptjs';
// import UsersModel from '../models/UsersModel';
import Users from '../database/models/Users';
import IUser from '../interfaces/IUser';

export default class UsersService {
  public usersModel = Users;

  public async findByEmail(email: string): Promise<IUser | null> {
    const result = await this.usersModel.findOne({ where: { email } });

    return result;
  }

  public async login(
    email: string,
    password: string,
  ): Promise<string | undefined> {
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
