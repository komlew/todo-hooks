import React, { useState } from 'react';
import { Wrapper, Title, List, Todo, TodoInput, TodoButton } from '../styles';

const getId = () =>
  Math.random()
    .toString()
    .slice(2, 8);

const getTasks = list => `(${list.filter(item => item.done).length}/${list.length - 1})`;

const today = new Date().toLocaleDateString();

const App = () => {
  const [todoList, setTodo] = useState([
    {
      id: getId(),
      done: false,
      value: 'Hello World!',
    },
    {
      id: getId(),
      done: false,
      reserved: true,
      value: '',
    },
  ]);

  const changeTodo = (e, id) => {
    const { value } = e.target;
    const todos = [...todoList];
    const todo = todos.find(item => item.id === id);
    if (todo) {
      todo.value = value;
      if (todo.reserved) {
        delete todo.reserved;
        setTodo(
          todos.concat({
            id: getId(),
            done: false,
            reserved: true,
            value: '',
          })
        );
      } else {
        setTodo(todos);
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
              value={todo.value}
              data={todo.id}
              onChange={e => changeTodo(e, todo.id)}
              onBlur={e => blurTodo(e, todo.id)}
              placeholder="Add ToDo..."
              done={todo.done}
            />
            {todo.reserved || (
              <TodoButton onClick={() => toggleTodo(todo.id)} done={todo.done}>
                <span role="img" aria-label="Done">
                  ✔
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
