import React from 'react';

const ListItem = ({ children, onClick }) => {
  return <li onClick={onClick}>{children}</li>;
};

export default ListItem;
