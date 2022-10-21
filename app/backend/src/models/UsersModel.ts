import Users from '../database/models/Users';
import IUser from '../interfaces/IUser';

export default class UsersModel {
  public users = Users;

  public async findOne(email: string): Promise<IUser | null> {
    const result = await this.users.findOne({ where: { email } });
    return result as IUser | null;
  }
}
