import React from 'react';
import LoadingEllipsis from './LoadingEllipsis';

import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <LoadingEllipsis />
    </div>
  );
};

export default LoadingScreen;
