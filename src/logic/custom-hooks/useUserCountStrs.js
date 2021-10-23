import { useState, useEffect } from 'react';

function useUserCountStrs(list, rolesRef) {
  const [userCountStrs, setUserCountStrs] = useState({});
  useEffect(() => {
    if (!rolesRef.current) return;

    for (const role in rolesRef.current) {
      const userCount = list.filter((user) => {
        if (role === 'Online') return !user.role;
        return user.role === role;
      }).length;

      userCount === 0
        ? rolesRef.current[role].classList.add('hidden')
        : rolesRef.current[role].classList.remove('hidden');

      setUserCountStrs((prev) => ({ ...prev, [role]: ` - ${userCount}` }));
    }
  }, [rolesRef, list]);

  return userCountStrs;
}

export default useUserCountStrs;
