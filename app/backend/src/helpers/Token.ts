import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { SignOptions, JwtPayload } from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';

export default abstract class Token {
  private static jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
  private static jwtOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  public static create(payload: IPayload): string {
    const token = jwt.sign(payload, Token.jwtSecret, Token.jwtOptions);

    return token;
  }

  public static validate(token: string): JwtPayload {
    const payload = jwt.verify(token, Token.jwtSecret);

    return payload as JwtPayload;
  }
}
