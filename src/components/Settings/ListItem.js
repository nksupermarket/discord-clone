import React from 'react';

const ListItem = ({ active, className, children, onClick, onLoad }) => {
  className = active ? `active ${className || ''}` : ` ${className || ''}`;
  return (
    <li className={`list-item ${className}`} onClick={onClick} onLoad={onLoad}>
      {children}
    </li>
  );
};

export default ListItem;
