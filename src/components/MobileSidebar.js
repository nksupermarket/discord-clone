import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

const MobileSidebar = ({
  isVisible,
  isLeft,
  className,
  children,
  hide,
}) => {
  const defaultClassName = isLeft ? 'left-sidebar' : 'right-sidebar';
  const contentRef = useRef();
  const transitions = useTransition(isVisible, {
    key: (item) => item,
    from: {
      transform: isLeft
        ? 'translate3d(-100%,0,0)'
        : 'translate3d(100%,0,0)',
    },
    enter: {
      transform: 'translate3d(0%,0,0)',
    },
    leave: {
      transform: isLeft
        ? 'translate3d(-100%,0,0)'
        : 'translate3d(100%,0,0)',
    },
    // key: true,
    expires: 0,
  });
  return transitions((styles, item, t, i) => {
    return (
      item && (
        <animated.div
          className={
            className
              ? `${className} ${defaultClassName}`
              : `${defaultClassName}`
          }
          onClick={hide}
        >
          <animated.div
            className="content-wrapper"
            ref={contentRef}
            onClick={(e) => {
              e.stopPropagation();
              if (
                e.target.closest('li') ||
                e.target.closest('button')
              )
                hide();
            }}
            style={styles}
          >
            {children}
          </animated.div>
        </animated.div>
      )
    );
  });
};

export default MobileSidebar;

MobileSidebar.propTypes = {
  isVisible: PropTypes.bool,
  isLeft: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  hide: PropTypes.func,
};
