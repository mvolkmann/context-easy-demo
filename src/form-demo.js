import {Checkboxes, RadioButtons, Select, TextArea} from './context-easy';
import React from 'react';

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

export default function FormDemo() {
  return (
    <div>
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
      <label className="block" htmlFor="comment">
        Comment
        <TextArea id="comment" path="feedback.comment" />
      </label>
    </div>
  );
}
