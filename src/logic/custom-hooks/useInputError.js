import { useState, useEffect } from 'react';
import { dynamicValidation } from '../formValidation';

function useInputError(inputNames) {
  const [inputError, setInputError] = useState(
    () => inputNames.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}) //turn inputNames into object keys
  );

  async function validateInput(el, isSubmit = false, pwConfirm = undefined) {
    const validationStatus = pwConfirm
      ? await dynamicValidation(el, isSubmit, pwConfirm)
      : await dynamicValidation(el, isSubmit); // have to await bc it might return a promise (depends on input name)

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

  async function submitForm(e, submitAction, cleanUp, setError) {
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

      await submitAction();
      cleanUp();
    } catch (error) {
      setError && setError(error.message);
    }
  }

  return { inputError, validateInput, submitForm };
}

export default useInputError;
