import styled from 'styled-components';

const Wrapper = styled.section`
  width: 320px;
  margin: 20px auto;
`;

const Title = styled.h1`
  margin: 0 10px 5px;
  font-size: 24px;
  color: #9cb6c9;
  font-family: monospace;
  font-weight: normal;
  letter-spacing: -2px;
  &:after {
    content: attr(data-tasks);
    margin-left: 0.5em;
  }
`;

const List = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 3px;
  background: #e5ecf1;
`;

const Todo = styled.li`
  padding: 5px;
  display: flex;
`;

const TodoInput = styled.input.attrs({
  type: 'text',
})`
  padding: 2px 5px;
  width: 100%;
  line-height: 1.2;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 3px;
  background: transparent;
  text-decoration: ${props => (props.done ? 'line-through' : 'none')};
  &:focus {
    background: cornsilk;
    outline: none;
    border-color: #9cb6c9;
  }
  &::placeholder {
    color: #9cb6c9;
  }
`;

const TodoButton = styled.button`
  padding: 0 4px;
  line-height: 1.4;
  font-size: 18px;
  border: 2px solid transparent;
  border-radius: 3px;
  height: 27px;
  vertical-align: top;
  margin-left: 5px;
  float: right;
  background: transparent;
  color: ${props => (props.done ? '#9cb6c9' : '#000')};
  &:hover,
  &:focus {
    background: cornsilk;
    outline: none;
    border-color: #9cb6c9;
  }
`;

export { Wrapper, Title, List, Todo, TodoInput, TodoButton };
