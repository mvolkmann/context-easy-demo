import React from 'react';

export default React.memo(({count, total}) => {
  console.log('percent.js: rendering');
  return <span>{((count / total) * 100).toFixed(2)}%</span>;
});
