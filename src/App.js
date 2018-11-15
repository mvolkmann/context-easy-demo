import {EasyProvider} from './context-easy';
import React from 'react';
import FormDemo from './form-demo';
import TodoList from './todo-list/todo-list';
import './App.scss';

const initialState = {
  nextId: 1,
  text: '',
  todos: []
};

export default function App() {
  return (
    <EasyProvider initialState={initialState} log validate>
      <TodoList />
      <FormDemo />
    </EasyProvider>
  );
}
