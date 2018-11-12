import {EasyContext} from 'context-easy';
import React, {useContext, useEffect, useRef} from 'react';
import './todo-list.scss';

async function addTodo(context) {
  const todo = {id: context.nextId, text: context.text, done: false};
  await context.push('todos', todo);
  await context.set('text', '');
  await context.increment('nextId');
}

function changeText(context, event) {
  context.set('text', event.target.value);
}

function deleteTodo(context, id) {
  context.filter('todos', todo => todo.id !== id);
}

function toggleDone(context, id) {
  context.map(
    'todos',
    todo => (todo.id === id ? {...todo, done: !todo.done} : todo)
  );
}

export default function TodoList() {
  const context = useContext(EasyContext);

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());

  // Should all of these use `useCallback`?
  const handleAdd = () => addTodo(context);
  const handleDelete = id => deleteTodo(context, id);
  const handleSubmit = e => e.preventDefault(); // prevents form submit
  const handleText = e => changeText(context, e);
  const handleToggleDone = id => toggleDone(context, id);

  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">
          <input
            placeholder="todo text"
            onChange={handleText}
            ref={inputRef}
            value={context.text}
          />
        </label>
        <button disabled={context.text === ''} onClick={handleAdd}>
          +
        </button>
      </form>
      {context.todos.map(todo => (
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
