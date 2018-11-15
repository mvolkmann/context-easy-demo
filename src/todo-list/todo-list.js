import React, {useContext} from 'react';

import {EasyContext, Input} from 'context-easy';

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

function toggleDone(context, id) {
  context.map('todos', todo =>
    todo.id === id ? {...todo, done: !todo.done} : todo
  );
}

export default function TodoList() {
  const context = useContext(EasyContext);

  //const inputRef = useRef();
  //useEffect(() => inputRef.current.focus());

  // Should all of these use `useCallback`?
  const handleAdd = () => addTodo(context);
  const handleDelete = id => deleteTodo(context, id);
  const handleSubmit = e => e.preventDefault(); // prevents form submit
  const handleToggleDone = id => toggleDone(context, id);

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
    </div>
  );
}
