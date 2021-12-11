import React, { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../styles/Tooltip.css';

const Tooltip = ({ text, posInfo, direction }) => {
  const toolTipRef = useRef();

  useLayoutEffect(() => {
    const toolTipHeight =
      toolTipRef.current.getBoundingClientRect().height;
    const toolTipWidth =
      toolTipRef.current.getBoundingClientRect().width;
    switch (direction) {
      case 'right': {
        toolTipRef.current.style.top = `${
          posInfo.top + toolTipHeight / 2 - 10
        }px`; // the 10 value represents height of arrow
        toolTipRef.current.style.left = `${posInfo.left + 82}px`;
        break;
      }
      case 'top': {
        toolTipRef.current.style.top = `${
          posInfo.top - toolTipHeight - 10
        }px`;
        toolTipRef.current.style.left = `${
          posInfo.left - toolTipWidth / 2 + posInfo.width / 2
        }px`;
        break;
      }
      default:
    }
  }, [direction, posInfo.top, posInfo.left, posInfo.width]);

  return ReactDOM.createPortal(
    <div className="tooltip" ref={toolTipRef}>
      <div className={`tooltip-wrapper ${direction}`}>
        <div className="text-wrapper">{text}</div>
      </div>
    </div>,
    document.querySelector('body'),
  );
};

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string,
  posInfo: PropTypes.object,
  direction: PropTypes.string,
};
