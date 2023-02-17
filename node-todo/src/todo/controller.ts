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

const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params['id'];
    Service.deleteTodo(id);

    res.status(StatusCodes.OK).send('Success');
  } catch (error) {
    next(error);
  }
};

function getTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params['id'];
    const result = Service.get(id);

    res.status(StatusCodes.OK).send(result);
  } catch (error) {
    next(error);
  }
}

const getTodos = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = Service.getTodos();

    res.status(StatusCodes.OK).send(result);
  } catch (error) {
    next(error);
  }
};

const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params['id'];
    const todo = req.body;

    const result = Service.updateTodo(id, todo);

    res.status(StatusCodes.OK).send(result);
  } catch (error) {
    next(error);
  }
};

export { createTodo, deleteTodo, getTodos, getTodo, updateTodo };
