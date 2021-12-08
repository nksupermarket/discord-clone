import { useState } from 'react';

export default function useInputValues(inputNames) {
  const [inputValues, setInputValues] = useState(
    inputNames
      ? inputNames.reduce((acc, curr) => {
          return (acc[curr] = '');
        }, {})
      : {}
  );

  function handleChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function resetInputValues() {
    setInputValues({});
  }

  return { inputValues, setInputValues, handleChange, resetInputValues };
}
