import React from 'react';

function shouldRender(prevProps, nextProps) {
  return (
    prevProps.count !== nextProps.count || prevProps.total !== nextProps.total
  );
}

export default React.memo(({count, total}) => {
  console.log('Percent rendering'); // to verify when this happens
  const percent = total === 0 ? 0 : (count / total) * 100;
  return <span>{percent.toFixed(2)}%</span>;
}, shouldRender);
