const getId = () =>
  Math.random()
    .toString()
    .slice(2, 8);

const getTasks = list => `(${list.filter(item => item.done).length}/${list.length - 1})`;

const getDefaultTodo = React => ({
  id: getId(),
  done: false,
  ref: React.createRef(),
  reserved: true,
  value: '',
});

export { getId, getTasks, getDefaultTodo };
