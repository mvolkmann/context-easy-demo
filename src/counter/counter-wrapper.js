import {EasyContext} from 'context-easy';
import React, {useCallback, useContext, useMemo} from 'react';

import Counter from './counter';

export default function CounterWrapper() {
  const context = useContext(EasyContext);
  const {count} = context;
  const increment = useCallback(() => context.increment('count'), []);
  return useMemo(
    () => {
      console.log('counter-wrapper.js: re-rendering');
      return <Counter value={count} increment={increment} />;
    },
    [count]
  );
}
