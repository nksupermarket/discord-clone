import React from 'react';

const MobileSidebar = ({ isLeft, className, children, hide }) => {
  const defaultClassName = isLeft ? 'left-sidebar' : 'right-sidebar';
  return (
    <div
      className={
        className ? `${className} ${defaultClassName}` : `${defaultClassName}`
      }
      onClick={hide}
    >
      <div
        className="content-wrapper"
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.closest('li') || e.target.closest('button')) hide();
          console.log('hi');
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileSidebar;
