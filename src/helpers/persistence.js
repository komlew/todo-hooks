// @flow
import React from 'react';
import { timers } from '../constants';
import { getDefaultTodo, debounce } from '.';
import type { TodoStored, Todo } from '../types';

const getStorage = () => {
  const defaultTodo: Array<Todo> = [getDefaultTodo()];
  try {
    const todoString = localStorage.getItem('todos');
    if (!todoString) {
      return defaultTodo;
    }
    const todoArray: Array<TodoStored> = JSON.parse(todoString) || [];
    const todos: Array<Todo> = todoArray.map((todo: TodoStored) => ({
      ...todo,
      ref: React.createRef(),
    }));
    const enrichedTodos: Array<Todo> = todos.concat(defaultTodo);
    return enrichedTodos;
  } catch (err) {
    // TODO: better error handling
    return defaultTodo;
  }
};

const setStorage = (todos: Array<Todo>) => {
  const todoArray: Array<TodoStored> = todos
    .filter(todo => !todo.reserved)
    .map(todo => ({
      id: todo.id,
      done: todo.done,
      value: todo.value,
    }));
  localStorage.setItem('todos', JSON.stringify(todoArray));
};

const setStorageDebounced = debounce(setStorage, timers.debounceSave);

export { getStorage, setStorage, setStorageDebounced };
