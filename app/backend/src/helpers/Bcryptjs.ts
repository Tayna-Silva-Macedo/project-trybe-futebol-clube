import * as bcrypt from 'bcryptjs';

export default abstract class Bcrypt {
  public static compare(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
