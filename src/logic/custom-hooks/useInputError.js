import { useState } from 'react';
import { dynamicValidation } from '../formValidation';

function useInputError(inputNames) {
  const [inputError, setInputError] = useState(
    () => inputNames.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}) //turn inputNames into object keys
  );

  function validateInput(el, pwConfirm) {
    const validationStatus = pwConfirm
      ? dynamicValidation(el, pwConfirm)
      : dynamicValidation(el);
    if (el.name === 'confirm_password') console.log(validationStatus);
    if (validationStatus.error) {
      setInputError((prev) => ({
        ...prev,
        [el.name]: validationStatus.error,
      }));
      return false;
    }
    return true;
  }

  return { inputError, validateInput };
}

export default useInputError;
