import { useState } from 'react';

export default function useInputValues() {
  const [inputValues, setInputValues] = useState({});

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
