import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './todo-list-reducer.scss';

const initialState = {
  text: '',
  todos: []
  // objects in this have id, text, and done properties.
};

let lastId = 0;

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    // setup steps
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup steps
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return width;
}

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
      const newTodos = todos.map(todo =>
        todo.id === id ? {...todo, done: !todo.done} : todo
      );
      return {...state, todos: newTodos};
    }
    default:
      return state;
  }
}

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const width = useWindowWidth();
  console.log('todo-list-reducer.js TodoList: width =', width);

  const handleAdd = useCallback(() => dispatch({type: 'add-todo'}), []);

  const handleDelete = useCallback(
    id => dispatch({type: 'delete-todo', payload: id}),
    []
  );

  const handleSubmit = useCallback(
    e => e.preventDefault(), // prevents form submit
    []
  );

  const handleText = useCallback(
    e => dispatch({type: 'change-text', payload: e.target.value}),
    []
  );

  const handleToggleDone = useCallback(
    id => dispatch({type: 'toggle-done', payload: id}),
    []
  );

  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">
          <input
            placeholder="todo text"
            onChange={handleText}
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
