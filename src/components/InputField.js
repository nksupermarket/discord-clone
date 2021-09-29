import React from 'react';
import Input from './Input.js';

const InputField = ({ label, ...inputProps }) => (
  <div className="input-field">
    {label && <label>{label}</label>}
    <Input {...inputProps} />
  </div>
);

export default InputField;
