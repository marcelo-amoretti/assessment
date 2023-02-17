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

const getOne = (id: string): Todo => {
  try {
    let todos: Todo[] = JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]');
    todos = todos?.filter(todo => !todo.deleted_at);

    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: 'Todo not found',
      };
    }

    return todo;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to get TODO',
    };
  }
};

const getAll = (): Todo[] => {
  try {
    let todos: Todo[] = JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]');
    todos = todos?.filter(todo => !todo.deleted_at);

    return todos;
  } catch (error) {
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to get TODOs',
    };
  }
};

export { create, getAll, getOne };
