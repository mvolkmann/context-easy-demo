import {EasyContext} from 'context-easy';
import React, {useContext, useMemo} from 'react';
import './label.scss';

export default function Label() {
  const context = useContext(EasyContext);
  const {name} = context.person;

  const jsx = useMemo(
    () => {
      console.log('label.js: re-rendering');
      return <div className="label">name = {name}</div>;
    },
    [name]
  );
  return jsx;
}
