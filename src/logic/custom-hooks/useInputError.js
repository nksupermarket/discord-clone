import { useState } from 'react';

function useInputError(inputNames) {
  const [inputError, setInputError] = useState(
    () => inputNames.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}) //turn inputNames into object keys
  );

  return { inputError, setInputError };
}

export default useInputError;
