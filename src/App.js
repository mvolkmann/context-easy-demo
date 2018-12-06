import {EasyProvider} from 'context-easy';
import React from 'react';
import FormDemo from './form-demo';
import TodoList from './todo-list/todo-list';
import TodoListReducer from './todo-list-reducer/todo-list-reducer';
import './App.scss';

const initialState = {
  nextId: 1,
  text: '',
  todos: []
};

export default function App() {
  const options = {log: true, validate: true};
  return (
    <EasyProvider initialState={initialState} options={options}>
      <TodoList />
      <FormDemo />
      <TodoListReducer />
    </EasyProvider>
  );
}
