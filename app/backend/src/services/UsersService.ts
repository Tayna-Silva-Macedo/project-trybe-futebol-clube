import Token from '../helpers/Token';
import Bcrypt from '../helpers/Bcryptjs';
import UsersModel from '../models/UsersModel';

export default class UsersService {
  public usersModel: UsersModel;

  constructor() {
    this.usersModel = new UsersModel();
  }

  public async login(email: string, password: string): Promise<string | undefined> {
    const result = await this.usersModel.findOne(email);

    if (result) {
      const isPasswordCorrect = Bcrypt.compare(password, result.password);

      if (isPasswordCorrect) {
        const token = Token.create({ id: result.id });
        return token;
      }
    }
  }
}
