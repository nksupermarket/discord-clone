import React from 'react';

const Input = ({ ...props }) => {
  return <input {...props} autocomplete="off" />;
};

export default Input;
