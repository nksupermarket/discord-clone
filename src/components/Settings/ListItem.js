import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({
  active,
  className,
  children,
  onClick,
  onLoad,
}) => {
  className = active
    ? `active ${className || ''}`
    : ` ${className || ''}`;
  return (
    <li
      className={`list-item ${className}`}
      onClick={onClick}
      onLoad={onLoad}
    >
      {children}
    </li>
  );
};

export default ListItem;

ListItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  onLoad: PropTypes.func,
};
