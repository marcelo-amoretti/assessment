import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as Service from './service';

const createTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = req.body;
    const result = Service.create(todo);

    res.status(StatusCodes.OK).send(result);
  } catch (error) {
    next(error);
  }
};

export { createTodo };
