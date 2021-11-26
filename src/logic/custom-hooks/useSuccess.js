import { useState, useEffect } from 'react';

export default function useSuccess(isMounted) {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success)
      setTimeout(() => {
        if (isMounted.current) setSuccess(false);
      }, 3500);
  });

  return {
    success,
    setSuccess,
  };
}
