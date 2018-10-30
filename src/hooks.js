import {useState} from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);
  // Returning these values in an object instead of an array
  // allows it to be spread into the props of the HTML input.
  return [{onChange, value}, setValue];
}
