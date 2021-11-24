import React from 'react';

import IconBtn from '../IconBtn';

const MainNavBtn = ({ icon, svg, active, onClick }) => {
  return (
    <div className="list-item" onClick={onClick}>
      <IconBtn
        icon={icon}
        svg={svg}
        className={active ? 'active' : null}
        isCircle={true}
      />
    </div>
  );
};

export default MainNavBtn;
