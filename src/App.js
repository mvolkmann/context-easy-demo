import {EasyProvider} from 'context-easy';
import React, {useState} from 'react';

import CounterWrapper from './counter/counter-wrapper';
import Entry from './entry';
import Label from './label/label';
import Percent from './percent';
import Pet from './pet';
import Pythagorean from './pythagorean';
import TodoList from './todo-list/todo-list';

import './App.scss';

const initialState = {
  count: 0,
  person: {
    name: 'Mark'
  }
};

export default function App() {
  const [count, setCount] = useState(0);
  const total = 8;
  return (
    <EasyProvider initialState={initialState} log validate>
      <CounterWrapper />
      <Entry />
      <Label />
      <Pet />
      <Pythagorean />
      <Percent count={count} total={total} />
      <button onClick={() => setCount(count + 1)}>+1</button>
      <TodoList />
    </EasyProvider>
  );
}
