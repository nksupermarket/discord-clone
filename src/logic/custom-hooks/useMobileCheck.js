import { useState, useEffect, useRef } from 'react';

export default function useMobileCheck() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobileCheck = useRef(window.innerWidth <= 768);

  function handleWindowResize() {
    setWindowWidth(window.innerWidth);
    isMobileCheck.current = windowWidth <= 768;
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () =>
      window.removeEventListener('resize', handleWindowResize);
  });

  return { isMobileCheck };
}
