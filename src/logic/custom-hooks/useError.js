import { useState, useEffect } from 'react';

export default function useError() {
  const [error, setError] = useState();

  useEffect(function ifError() {
    if (error)
      setTimeout(() => {
        setError();
      }, 3500);
  });

  return { error, setError };
}
