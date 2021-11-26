import React, { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

import '../styles/Tooltip.css';

const Tooltip = ({ text, posInfo }) => {
  const toolTipRef = useRef();

  useLayoutEffect(() => {
    const toolTipHeight = toolTipRef.current.getBoundingClientRect().height;
    toolTipRef.current.style.top = `${posInfo.top + toolTipHeight / 2 - 10}px`; //the 10 value represents height of arrow
    toolTipRef.current.style.left = `${posInfo.left + 82}px`;
  }, [posInfo.top, posInfo.left]);

  return ReactDOM.createPortal(
    <div className="tooltip" ref={toolTipRef}>
      <div className="tooltip-wrapper">
        <div className="text-wrapper">{text}</div>
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default Tooltip;
