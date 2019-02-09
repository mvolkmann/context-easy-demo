import {useEffect, useState} from 'react';

export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    // setup steps
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup steps when using component is unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, []); // only run on initial render
  return width;
}
