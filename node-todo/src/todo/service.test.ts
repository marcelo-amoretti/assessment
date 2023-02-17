import { expect, jest, test, describe } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import * as Repository from './repository';
import * as Service from './service';

const mockedDB = [
  {
    id: '73c455a4-8d1f-434d-9e6c-4cdc25ee4fd2',
    text: 'Default values',
    priority: 5,
    done: true,
    created_at: 'Thu Feb 16 2023 15:31:39 GMT-0300 (Brasilia Standard Time)',
    updated_at: null,
    deleted_at: null,
  },
  {
    id: '73c455a4-434d-8d1f-4cdc25ee4fd2-9e6c',
    text: 'Default values',
    priority: 5,
    done: true,
    created_at: 'Thu Feb 16 2023 16:32:01 GMT-0300 (Brasilia Standard Time)',
    updated_at: null,
    deleted_at: null,
  },
  {
    id: '73c455a4-8d1f-4d434d-9e6c-ee4fd24cdc25',
    text: 'Default values',
    priority: 5,
    done: true,
    created_at: 'Thu Feb 16 2023 18:01:39 GMT-0300 (Brasilia Standard Time)',
    updated_at: null,
    deleted_at: null,
  },
  {
    id: '55a473c4-1f8d1f-434d-9e6c-25ee4cdc4fd2',
    text: 'Default values',
    priority: 5,
    done: true,
    created_at: 'Thu Feb 16 2023 18:15:39 GMT-0300 (Brasilia Standard Time)',
    updated_at: null,
    deleted_at: null,
  },
];

describe('getOne tests', () => {
  test('should get a specific Todo from list', () => {
    let spyGetOne = jest.spyOn(Repository, 'getOne');
    spyGetOne.mockReturnValue(mockedDB[2]);
    let response = Service.get('73c455a4-8d1f-4d434d-9e6c-ee4fd24cdc25');
    expect(response).toEqual(mockedDB[2]);
    expect(spyGetOne).toBeCalledTimes(1);
  });

  test('try to fetch a Todo that does not exist', () => {
    try {
      Service.get('123');
    } catch (error: any) {
      expect(error.status).toBe(400);
      expect(error.message).toBe('Todo not found');
    }
  });
});

describe('getAll tests', () => {
  test('should return all Todos', () => {
    let SpyGetAll = jest.spyOn(Repository, 'getAll');
    SpyGetAll.mockReturnValue(mockedDB);

    let response = Service.getTodos();
    expect(response).toEqual(mockedDB);
    expect(SpyGetAll).toBeCalledTimes(1);
  });
});

describe('create new Todos', () => {
  test('should save a Todo with all properties', () => {
    const newTodo = {
      text: 'Do this today',
      priority: 5,
      done: false,
    };

    const todoResponse = {
      id: uuidv4(),
      text: 'Do this today',
      priority: 5,
      done: false,
      created_at: new Date().toString(),
      updated_at: null,
      deleted_at: null,
    };

    let spyCreateTodo = jest.spyOn(Repository, 'create');
    spyCreateTodo.mockReturnValue(todoResponse);
    let response = Service.create(newTodo);

    expect(response).toBe(todoResponse);
  });

  test('should create with default Priority', () => {
    const newTodo = {
      text: 'Do this tomorrow',
      done: true,
    };

    const todoResponse = {
      id: uuidv4(),
      text: 'Do this today',
      priority: 3,
      done: true,
      created_at: new Date().toString(),
      updated_at: null,
      deleted_at: null,
    };

    let spyCreateTodo = jest.spyOn(Repository, 'create');
    spyCreateTodo.mockReturnValue(todoResponse);
    let response = Service.create(newTodo);

    expect(response).toBe(todoResponse);
  });

  test('should create with done as false since not provided', () => {
    const newTodo = {
      text: 'Do this someday',
    };

    const todoResponse = {
      id: uuidv4(),
      text: 'Do this someday',
      priority: 3,
      done: false,
      created_at: new Date().toString(),
      updated_at: null,
      deleted_at: null,
    };

    let spyCreateTodo = jest.spyOn(Repository, 'create');
    spyCreateTodo.mockReturnValue(todoResponse);
    let response = Service.create(newTodo);

    expect(response).toBe(todoResponse);
  });
});

describe('update Todo', () => {
  let spyUpdateTodo = jest.spyOn(Repository, 'updateTodo');
  test('should update a todo', () => {
    const todo = {
      ...mockedDB[0],
      text: 'Updated text',
      done: false,
    };

    const newTodo = {
      id: '73c455a4-8d1f-434d-9e6c-4cdc25ee4fd2',
      text: 'Updated text',
      priority: 5,
      done: false,
      created_at: 'Thu Feb 16 2023 18:01:39 GMT-0300 (Brasilia Standard Time)',
      updated_at: 'Thu Feb 16 2023 20:39:33 GMT-0300 (Brasilia Standard Time)',
      deleted_at: null,
    };
    spyUpdateTodo.mockReturnValue(newTodo);
    let response = Service.updateTodo(mockedDB[0].id, todo);

    expect(response).toBe(newTodo);
    expect(spyUpdateTodo).toBeCalledTimes(1);
  });
});

describe('delete Todo', () => {
  test('Should delete a todo', () => {
    let spyDeleteTodo = jest.spyOn(Repository, 'deleteTodo');
    spyDeleteTodo.mockReturnValue(true);

    let response = Service.deleteTodo(mockedDB[0].id);
    expect(response).toBeTruthy();
  });
});
