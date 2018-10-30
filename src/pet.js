import React, {useCallback, useMemo, useState} from 'react';
import {useFormInput} from './hooks';

const breeds = [
  '',
  'German Shorthaired Pointer',
  'Greyhound',
  'Native American Indian Dog',
  'Poodle',
  'Treeing Walker Coonhound',
  'Whippet'
];

let lastHandle;

/**
 * This component demonstrates using the `useState` hook.
 */
export default function Pet() {
  const [breed, setBreed] = useState('');
  const [isUpper, setIsUpper] = useState(false);

  const handleBreedChange = useCallback(e => setBreed(e.target.value), []);
  if (lastHandle && handleBreedChange !== lastHandle) {
    console.log('pet.js Pet: handleBreedChange changed!');
  }
  lastHandle = handleBreedChange;

  /*
  const jsx = <div>stuff</div>;
  console.log('pet.js Pet: typeof jsx =', typeof jsx);
  console.log('pet.js Pet: jsx =', jsx);
  */

  const [nameProps, setName] = useFormInput('');
  const {value: name} = nameProps;

  /*
  useEffect(
    () => {
      console.log('pet.js useEffect: setup');
      return () => console.log('pet.js useEffect: cleanup');
    },
    [isUpper, name]
    //[]
  );
  */

  const toggleCase = useCallback(
    () => {
      setName(isUpper ? name.toLowerCase() : name.toUpperCase());
      setIsUpper(!isUpper);
    },
    [isUpper, name] // things that can change the result
  );

  const breedOptions = useMemo(
    () => breeds.map(breed => <option key={breed}>{breed}</option>),
    [breeds]
  );

  return (
    <div>
      <div>
        <label htmlFor="name">
          Name
          <input {...nameProps} />
          <button onClick={toggleCase}>Toggle Case</button>
        </label>
      </div>
      <div>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            onBlur={handleBreedChange}
            onChange={handleBreedChange}
            value={breed}
          >
            {breedOptions}
          </select>
        </label>
      </div>
      <div>
        {name &&
          breed && (
            <div>
              {name} is a {breed}.
            </div>
          )}
      </div>
    </div>
  );
}
