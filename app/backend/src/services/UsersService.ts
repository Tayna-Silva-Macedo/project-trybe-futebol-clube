import { StatusCodes } from 'http-status-codes';
import HttpException from '../helpers/HttpExpection';
import Token from '../helpers/Token';
import Bcrypt from '../helpers/Bcryptjs';
import UsersModel from '../models/UsersModel';

export default class UsersService {
  public usersModel: UsersModel;

  constructor() {
    this.usersModel = new UsersModel();
  }

  public async login(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    const result = await this.usersModel.findOne(email);

    if (!result) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const isPasswordCorrect = Bcrypt.compare(password, result.password);

    if (!isPasswordCorrect) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = Token.create({ id: result.id });
    return token;
  }
}
