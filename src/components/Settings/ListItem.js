import React from 'react';

const ListItem = ({ children, onClick }) => {
  return (
    <li className="list-item" onClick={onClick}>
      {children}
    </li>
  );
};

export default ListItem;
