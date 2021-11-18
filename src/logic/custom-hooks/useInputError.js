import { useState, useEffect } from 'react';
import { dynamicValidation } from '../formValidation';

function useInputError(inputNames) {
  const [inputError, setInputError] = useState(
    () => inputNames.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}) //turn inputNames into object keys
  );

  async function validateInput(el, isSubmit = false, pwConfirm = undefined) {
    const validationStatus = pwConfirm
      ? await dynamicValidation(el, isSubmit, pwConfirm)
      : await dynamicValidation(el, isSubmit);

    if (validationStatus.error) {
      setInputError((prev) => ({
        ...prev,
        [el.name]: validationStatus.error,
      }));
      return false;
    }
    setInputError((prev) => ({
      ...prev,
      [el.name]: '',
    }));
    return true;
  }

  async function submitForm(e, submitAction, close, setError) {
    e.preventDefault();

    const {
      target: { elements }, //destructure e to get elements
    } = e;

    try {
      let errors = false;
      for (const fname of inputNames) {
        //iterate through each input field and validate
        const currEl = elements.namedItem(fname);
        const isValid =
          fname === 'confirm_password'
            ? await validateInput(
                currEl,
                true,
                elements.namedItem('new_password').value
              )
            : await validateInput(currEl, true);
        if (!isValid) errors = true;
      }
      if (errors) return;

      await submitAction(
        // submit action = update user info
        elements.namedItem(inputNames.find((fname) => fname.includes('new')))
          .value //inputName w/ new means that is the value to be updated
      );
      close();
    } catch (error) {
      setError && setError(error.message);
    }
  }

  return { inputError, validateInput, submitForm };
}

export default useInputError;
