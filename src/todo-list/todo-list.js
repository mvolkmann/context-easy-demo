import {EasyContext, Input} from 'context-easy';
import React, {useCallback, useContext, useRef} from 'react';
import EffectsDemo from '../effects';
import Percent from '../percent';

import './todo-list.scss';

async function addTodo(context) {
  const todo = {id: context.nextId, text: context.text, done: false};
  await context.push('todos', todo);
  await context.set('text', '');
  await context.increment('nextId');
}

function deleteTodo(context, id) {
  context.filter('todos', todo => todo.id !== id);
}

// Prevent form submit.
const handleSubmit = e => e.preventDefault();

function toggleDone(context, id) {
  context.map('todos', todo =>
    todo.id === id ? {...todo, done: !todo.done} : todo
  );
}

export default function TodoList() {
  const context = useContext(EasyContext);
  const deleteCountRef = useRef(0); // initial value is zero

  const handleAdd = useCallback(() => addTodo(context), [context]);

  const handleDelete = useCallback(id => {
    deleteTodo(context, id);
    deleteCountRef.current++;
    console.log('You have deleted', deleteCountRef.current, 'todos.');
  }, []);

  const handleToggleDone = useCallback(id => toggleDone(context, id), []);

  const doneCount = context.todos.reduce(
    (sum, todo) => sum + (todo.done ? 1 : 0),
    0
  );

  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">
            <Input path="text" placeholder="todo text" />
          </label>
          <button disabled={context.text === ''} onClick={handleAdd}>
            +
          </button>
        </div>
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
      <EffectsDemo count={context.todos.length} />
      <Percent
        count={doneCount}
        total={context.todos.length}
        millis={Date.now()}
      />
    </div>
  );
}
