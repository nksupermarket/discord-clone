import { useState, useEffect } from 'react';

const Import = ({ isMobile, mobile, desktop, children }) => {
  const [Component, setComponent] = useState();

  useEffect(() => {
    const importCallback = isMobile ? mobile : desktop;

    if (importCallback) {
      (async () => {
        const componentDetails = await importCallback();
        setComponent(componentDetails);
      })();
    }
  }, [mobile, desktop, isMobile]);

  return children(Component ? Component.default : () => null);
};

export default Import;
