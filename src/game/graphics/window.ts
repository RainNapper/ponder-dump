import { useState, useEffect } from 'react';
import { IDim } from '.';

function getWindowDimensions(): IDim {
  const { innerWidth: w, innerHeight: h } = window;
  return { w, h };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
