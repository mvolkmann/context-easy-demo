import React from 'react';
import {fireEvent, render} from 'react-testing-library';
import Counter from './counter';

test('increments on click', () => {
  const value = 0;
  let called = false;
  const increment = () => (called = true);
  const {getByTestId} = render(<Counter value={value} increment={increment} />);
  const button = getByTestId('counter-btn');
  fireEvent.click(button);
  expect(called).toBe(true);
});
