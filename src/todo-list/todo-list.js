import React, {useEffect, useReducer, useRef} from 'react';
import './todo-list.scss';

const initialState = {
  text: '',
  todos: []
  // todo objects in the todos array have id, text, and done properties.
};

let lastId = 0;

function reducer(state, action) {
  const {text, todos} = state;
  const {payload, type} = action;
  switch (type) {
    case 'add-todo': {
      const newTodos = todos.concat({id: ++lastId, text, done: false});
      return {...state, text: '', todos: newTodos};
    }
    case 'change-text':
      return {...state, text: payload};
    case 'delete-todo': {
      const id = payload;
      const newTodos = todos.filter(todo => todo.id !== id);
      return {...state, todos: newTodos};
    }
    case 'toggle-done': {
      const id = payload;
      const newTodos = todos.map(
        todo => (todo.id === id ? {...todo, done: !todo.done} : todo)
      );
      return {...state, todos: newTodos};
    }
    default:
      return state;
  }
}

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());

  const deleteCountRef = useRef(0);

  const handleAdd = () => dispatch({type: 'add-todo'});
  const handleDelete = id => {
    deleteCountRef.current++;
    dispatch({type: 'delete-todo', payload: id});
    console.log('You have now deleted', deleteCountRef.current, 'todos.');
  };
  const handleSubmit = e => e.preventDefault(); // prevents form submit
  const handleText = e =>
    dispatch({type: 'change-text', payload: e.target.value});
  const handleToggleDone = id => dispatch({type: 'toggle-done', payload: id});

  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">
          <input
            placeholder="todo text"
            onChange={handleText}
            ref={inputRef}
            value={state.text}
          />
        </label>
        <button onClick={handleAdd}>+</button>
      </form>
      {state.todos.map(todo => (
        <div className="todo" key={todo.id}>
          <input
            type="checkbox"
            onChange={() => handleToggleDone(todo.id)}
            value={todo.done}
          />
          <span className={`done-${todo.done}`}>{todo.text}</span>
          <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
