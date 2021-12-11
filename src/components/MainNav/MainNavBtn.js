import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import IconBtn from '../IconBtn';
import Tooltip from '../Tooltip';

const MainNavBtn = ({ tooltipText, icon, svg, active, onClick }) => {
  const btnRef = useRef();

  const [isTooltip, setIsTooltip] = useState(false);
  return (
    <div
      className="list-item"
      onClick={onClick}
      ref={btnRef}
      onMouseEnter={() => setIsTooltip(true)}
      onMouseLeave={() => setIsTooltip(false)}
    >
      <IconBtn
        icon={icon}
        svg={svg}
        className={active ? 'active' : null}
      />
      {isTooltip && (
        <Tooltip
          text={tooltipText}
          posInfo={btnRef.current.getBoundingClientRect()}
          direction={'right'}
        />
      )}
    </div>
  );
};

export default MainNavBtn;

MainNavBtn.propTypes = {
  tooltipText: PropTypes.string,
  icon: PropTypes.string,
  svg: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
