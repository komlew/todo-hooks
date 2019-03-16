import React, { useState } from 'react';
import { Wrapper, Title, List, Todo, TodoInput, TodoButton } from '../styles';
import { today, copy, keyCodes } from '../constants';
import { getTasks, getDefaultTodo } from '../helpers';

const App = () => {
  const [todoList, setTodo] = useState([getDefaultTodo(React)]);

  const changeTodo = (e, id) => {
    const { value } = e.target;
    const todos = [...todoList];
    const todo = todos.find(item => item.id === id);
    if (todo) {
      todo.value = value;
      if (todo.reserved) {
        delete todo.reserved;
        setTodo(todos.concat(getDefaultTodo(React)));
      } else {
        setTodo(todos);
      }
    }
  };

  const passFocus = (e, todo) => {
    if (e.keyCode === keyCodes.enter) {
      const index = todoList.indexOf(todo);
      const nextEl = todoList[index + 1];
      if (nextEl && nextEl.ref && nextEl.ref.current) {
        nextEl.ref.current.focus();
      }
    }
  };

  const blurTodo = (e, id) => {
    const { value } = e.target;
    if (!value) {
      setTodo(todoList.filter(item => item.id !== id || item.reserved));
    }
  };

  const toggleTodo = id => {
    const todos = [...todoList];
    const todo = todos.find(item => item.id === id);
    if (todo) {
      todo.done = !todo.done;
      setTodo(todos);
    }
  };

  return (
    <Wrapper>
      <Title data-tasks={getTasks(todoList)}>{today}</Title>
      <List>
        {todoList.map(todo => (
          <Todo key={todo.id}>
            <TodoInput
              ref={todo.ref}
              value={todo.value}
              data={todo.id}
              onKeyDown={e => passFocus(e, todo)}
              onChange={e => changeTodo(e, todo.id)}
              onBlur={e => blurTodo(e, todo.id)}
              placeholder={copy.add}
              done={todo.done}
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
