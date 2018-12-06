import React, {useEffect} from 'react';

export default function Effects(props) {
  useEffect(() => {
    console.log('performing setup, props =', props);
    return () => {
      console.log('performing cleanup');
    };
  }, []);

  return <div>Effects Demo</div>;
}
