import React from 'react';

function skipRender(prevProps, nextProps) {
  return (
    prevProps.count === nextProps.count && prevProps.total === nextProps.total
  );
}

const Percent = React.memo(({count, total}) => {
  console.log('Percent rendering'); // to verify when this happens
  const percent = total === 0 ? 0 : (count / total) * 100;
  return <span>{percent.toFixed(2)}%</span>;
}, skipRender);

export default Percent;
