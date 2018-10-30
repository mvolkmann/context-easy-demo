import {func, number} from 'prop-types';
import React from 'react';

const Counter = React.memo(({increment, value}) => (
  <div className="counter">
    <button data-testid="counter-btn" onClick={increment}>
      {value}
    </button>
    {Date.now() /* to indicate re-render */}
  </div>
));

Counter.propTypes = {
  increment: func.isRequired,
  value: number.isRequired
};

export default Counter;
