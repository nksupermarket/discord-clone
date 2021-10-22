import React from 'react';

import IconBtn from '../IconBtn';

const MainNavBtn = ({ icon, svg }) => {
  return (
    <div className="list-item">
      {icon && <IconBtn icon={icon} isCircle={true} />}
      {svg && <svgBtn svg={svg} isCircle={true} />}
    </div>
  );
};

export default MainNavBtn;
