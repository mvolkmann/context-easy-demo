import {EasyContext} from 'context-easy';
import React, {useCallback, useContext} from 'react';

export default function Entry() {
  const context = useContext(EasyContext);

  const handleChange = useCallback(
    e => context.set('person.name', e.target.value),
    []
  );

  return (
    <div className="entry">
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          onChange={handleChange}
          value={context.person.name}
        />
      </label>
    </div>
  );
}
