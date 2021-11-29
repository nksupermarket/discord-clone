import React, { useRef } from 'react';

const MobileSidebar = ({ isLeft, className, children, hide }) => {
  const defaultClassName = isLeft ? 'left-sidebar' : 'right-sidebar';
  const contentRef = useRef();

  return (
    <div
      className={
        className ? `${className} ${defaultClassName}` : `${defaultClassName}`
      }
      onClick={hide}
    >
      <div
        className="content-wrapper"
        ref={contentRef}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.closest('li') || e.target.closest('button')) hide();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileSidebar;
