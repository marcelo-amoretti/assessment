import * as Repository from './repository';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from './model';

const create = (todo: Omit<Todo, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Todo => {
  const newTodo = {
    id: uuidv4(),
    text: todo.text,
    priority: todo?.priority || 3,
    done: !!todo?.done,
    created_at: new Date().toString(),
    updated_at: null,
    deleted_at: null,
  };

  return Repository.create(newTodo);
};

const get = (id: string): Todo => Repository.getOne(id);

const getTodos = (): Todo[] => Repository.getAll();

export { create, getTodos, get};
