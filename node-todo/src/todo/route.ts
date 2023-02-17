import express from 'express';
import * as Controller from './controller';
import { validate } from '../config/middleware';
import * as Validator from './validations';

const todoRouter = express.Router();

todoRouter.get('/todos', Controller.getTodos);
todoRouter.get('/todos/:id', validate(Validator.getTodo), Controller.getTodo);
todoRouter.delete('/todos/:id', validate(Validator.deleteTodo), Controller.deleteTodo);
todoRouter.post('/todos', validate(Validator.createTodo), Controller.createTodo);
todoRouter.put('/todos/:id', validate(Validator.updateTodo), Controller.updateTodo);

export default todoRouter;
