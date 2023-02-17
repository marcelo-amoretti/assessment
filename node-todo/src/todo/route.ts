import express from 'express';
import * as Controller from './controller';
import { validate } from '../config/middleware';
import * as Validator from './validations';

const todoRouter = express.Router();

todoRouter.get('/todos', Controller.getTodos);
todoRouter.post('/todos', validate(Validator.createTodo), Controller.createTodo);
export default todoRouter;
