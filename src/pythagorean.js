import React, {useCallback, useMemo} from 'react';
import {useFormInput} from './hooks';

export default function Pythagorean() {
  const [xProps, setX] = useFormInput(3);
  const [yProps] = useFormInput(4);
  const x = Number(xProps.value);
  const y = Number(yProps.value);

  const hypot = useMemo(
    () => {
      console.log('label.js: calculating for', x, 'and', y);
      if (x === '' || y === '') return '';
      return Math.sqrt(x * x + y * y).toFixed(3);
    },
    [x, y]
  );

  const sum = useCallback(x + y, [x, y]);

  return useCallback(
    <div className="pythagorean">
      <div>
        <label htmlFor="x">
          x <input type="number" {...xProps} />
        </label>
        {Date.now() /* to indicate re-render */}
      </div>
      <div>
        <label htmlFor="y">
          y <input type="number" {...yProps} />
        </label>
      </div>
      <div>
        <button onClick={() => setX(x => x + 1)}>x++</button>
      </div>
      <div>
        <label htmlFor="hypot">hypotenuse: {hypot}</label>
      </div>
      <div>
        <label htmlFor="sum">sum: {sum}</label>
      </div>
    </div>,
    [x, y, hypot]
  );
}
