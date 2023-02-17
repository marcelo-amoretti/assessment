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

const deleteTodo = (id: string): boolean => {
  try {
    const todos = JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]');
    const todoIndex = todos.findIndex((el: Todo) => el.id === id);

    if (todoIndex < 0) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: 'Todo not found',
      };
    }

    const deletedTodo = {
      ...todos[todoIndex],
      updated_at: new Date().toString(),
      deleted_at: new Date().toString(),
    };

    todos[todoIndex] = deletedTodo;
    writeFileSync(jsonFile, JSON.stringify(todos));

    return true;
  } catch (error: any) {
    if (error.status) {
      return error;
    }
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to delete todo',
    };
  }
};

const updateTodo = (todo: Todo): Todo => {
  try {
    const todos: Todo[] = JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]');
    const todoIndex = todos.findIndex(el => el.id === todo.id);
    todos[todoIndex] = todo;

    writeFileSync(jsonFile, JSON.stringify(todos));

    return todo;
  } catch (error: any) {
    if (error.status) {
      throw error;
    }
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to create new todo',
    };
  }
};

const getOne = (id: string): Todo => {
  try {
    const todos: Todo[] = JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]')?.filter((todo: Todo) => !todo.deleted_at);

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
    return JSON.parse(readFileSync(jsonFile, 'utf-8') || '[]')?.filter((todo: Todo) => !todo.deleted_at);
  } catch (error) {
    throw {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Unable to get TODOs',
    };
  }
};

export { create, deleteTodo, getAll, getOne, updateTodo };
