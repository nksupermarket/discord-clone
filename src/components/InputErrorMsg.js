import React from 'react';
import PropTypes from 'prop-types';

const InputErrorMsg = ({ error }) => {
  return <span className="input-error-msg">{error}</span>;
};

export default InputErrorMsg;

InputErrorMsg.propTypes = {
  error: PropTypes.string,
};
