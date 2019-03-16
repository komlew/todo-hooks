// @flow
import React, { useState } from 'react';
import { Wrapper, Title, List, Todo, TodoInput, TodoButton } from '../styles';
import { today, copy, keyCodes } from '../constants';
import { getTasks, getDefaultTodo, findByID, filterOutByID } from '../helpers';
import type { Todo as TypeTodo } from '../types';

const App = () => {
  const [todoList, setTodo] = useState([getDefaultTodo()]);

  const changeTodo = (e: SyntheticInputEvent<HTMLElement>, id: string) => {
    const { value } = e.target;
    const todos = [...todoList];
    const todo: ?TypeTodo = findByID(todos, id);
    if (todo) {
      todo.value = value;
      if (todo.reserved) {
        delete todo.reserved;
        setTodo(todos.concat(getDefaultTodo()));
      } else {
        setTodo(todos);
      }
    }
  };

  const passFocus = (e: SyntheticKeyboardEvent<HTMLElement>, todo: TypeTodo) => {
    if (e.keyCode !== keyCodes.enter) {
      return;
    }
    const index = todoList.indexOf(todo);
    const todos: Array<TypeTodo> = todoList;
    const nextTodo: ?TypeTodo = todos[index + 1];
    if (nextTodo != null && nextTodo.ref && nextTodo.ref.current) {
      const el: HTMLElement = nextTodo.ref.current;
      el.focus();
    }
  };

  const blurTodo = (e: SyntheticInputEvent<HTMLElement>, id) => {
    const { value } = e.target;
    if (!value) {
      setTodo(filterOutByID(todoList, id));
    }
  };

  const toggleTodo = (id: string) => {
    const todos = [...todoList];
    const todo: ?TypeTodo = findByID(todos, id);
    if (todo) {
      todo.done = !todo.done;
      setTodo(todos);
    }
  };

  return (
    <Wrapper>
      <Title data-tasks={getTasks(todoList)}>{today}</Title>
      <List>
        {todoList.map((todo: TypeTodo) => (
          <Todo key={todo.id}>
            <TodoInput
              ref={todo.ref}
              value={todo.value}
              data={todo.id}
              onKeyDown={(e: SyntheticKeyboardEvent<HTMLElement>) => passFocus(e, todo)}
              onChange={(e: SyntheticInputEvent<HTMLElement>) => changeTodo(e, todo.id)}
              onBlur={(e: SyntheticInputEvent<HTMLElement>) => blurTodo(e, todo.id)}
              placeholder={copy.add}
              done={todo.done}
              autoFocus={todoList.length === 1}
            />
            {todo.reserved || (
              <TodoButton onClick={() => toggleTodo(todo.id)} done={todo.done}>
                <span role="img" aria-label={copy.done}>
                  {copy.doneIcon}
                </span>
              </TodoButton>
            )}
          </Todo>
        ))}
      </List>
    </Wrapper>
  );
};

export default App;
