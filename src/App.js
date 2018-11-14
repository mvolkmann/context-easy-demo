import {
  Checkboxes,
  EasyProvider,
  RadioButtons,
  Select,
  TextArea
} from 'context-easy';
import React from 'react';
import TodoList from './todo-list/todo-list';
import './App.scss';

const initialState = {
  nextId: 1,
  text: '',
  todos: []
};

const checkboxList = [
  {text: 'Red', path: 'color.red'},
  {text: 'Green', path: 'color.green'},
  {text: 'Blue', path: 'color.blue'}
];

const radioButtonList = [
  {text: 'Chocolate', value: 'choc'},
  {text: 'Strawberry', value: 'straw'},
  {text: 'Vanilla', value: 'van'}
];

export default function App() {
  return (
    <EasyProvider initialState={initialState} log validate>
      <TodoList />
      <Checkboxes className="colors" list={checkboxList} />
      <RadioButtons
        className="flavor"
        list={radioButtonList}
        path="favoriteFlavor"
      />
      <label htmlFor="favColor">
        Favorite Color
        <Select id="favColor" path="user.favoriteColor">
          <option>red</option>
          <option>green</option>
          <option>blue</option>
        </Select>
      </label>
      <TextArea path="feedback.comment" />
    </EasyProvider>
  );
}
