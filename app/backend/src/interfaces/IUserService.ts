import IUser from './IUser';

export default interface IUserService {
  findByEmail(email: string): Promise<IUser | null>;
  login(email: string, password: string): Promise<string>;
}
