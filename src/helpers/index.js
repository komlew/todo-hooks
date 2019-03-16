// @flow
import React from 'react';
import type { Todo } from '../types';

const getId: () => string = () =>
  Math.random()
    .toString()
    .slice(2, 8);

const getTasks: (Array<Todo>) => string = todos => `(${todos.filter(item => item.done).length}/${todos.length - 1})`;

const getDefaultTodo: () => Todo = () => ({
  id: getId(),
  done: false,
  ref: React.createRef(),
  reserved: true,
  value: '',
});

const findByID: (Array<Todo>, string) => ?Todo = (todos, id) => todos.find(item => item.id === id);

const filterOutByID: (Array<Todo>, string) => Array<Todo> = (todos, id) =>
  todos.filter(item => item.id !== id || item.reserved);

export { getId, getTasks, getDefaultTodo, findByID, filterOutByID };
