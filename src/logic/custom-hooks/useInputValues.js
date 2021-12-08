import { useState } from 'react';

export default function useInputValues(initValue) {
  const [inputValues, setInputValues] = useState(initValue || {});

  function handleChange(e) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function resetInputValues() {
    setInputValues({});
  }

  return { inputValues, setInputValues, handleChange, resetInputValues };
}
