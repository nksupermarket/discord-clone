import React from 'react';
import Input from './Input.js';

const InputField = ({ label, error, ...inputProps }) => {
  return (
    <div className={error ? 'error input-wrapper' : 'input-wrapper'}>
      {label && (
        <label>
          <span className="caps-title">{label}</span>
          {error && <span className="error-msg"> - {error}</span>}
        </label>
      )}
      <Input {...inputProps} />
    </div>
  );
};

export default InputField;
