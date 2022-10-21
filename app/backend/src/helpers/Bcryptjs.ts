import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  private static salt = 10;

  public static encrypt(password: string): string {
    return bcrypt.hashSync(password, Bcrypt.salt);
  }

  public static compare(password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
