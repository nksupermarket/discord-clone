import { useState } from 'react';

export default function useInputValues(init) {
  const [inputValues, setInputValues] = useState(init || {});

  function handleChange(e) {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function resetInputValues() {
    setInputValues({});
  }

  return {
    inputValues,
    setInputValues,
    handleChange,
    resetInputValues,
  };
}
