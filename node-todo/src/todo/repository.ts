import { Todo } from './model';

const jsonFile = './Todos.json';
import { readFileSync, writeFileSync } from 'fs';
import { StatusCodes } from 'http-status-codes';

const create = (todo: Todo): Todo => {
  try {
    const todos = JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]');
    todos.push(todo);
    writeFileSync(jsonFile, JSON.stringify(todos));

    return todo;
  } catch (error) {
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to create new todo',
    };
  }
};

export { create };
