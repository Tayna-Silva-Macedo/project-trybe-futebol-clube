import { NextFunction, Request, Response } from 'express';
import HttpException from '../helpers/HttpExpection';

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    throw new HttpException(400, 'All fields must be filled');
  }

  next();
};

export default loginValidation;
