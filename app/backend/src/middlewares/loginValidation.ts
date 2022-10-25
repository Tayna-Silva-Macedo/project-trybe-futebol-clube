import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import HttpException from '../helpers/HttpException';

const loginValidation = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpException(StatusCodes.BAD_REQUEST, 'All fields must be filled');
  }

  next();
};

export default loginValidation;
