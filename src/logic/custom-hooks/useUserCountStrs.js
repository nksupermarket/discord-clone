import { useState, useEffect } from 'react';

export default function useUserCountStrs(list, roles, rolesRef) {
  const [userCountStrs, setUserCountStrs] = useState({});
  useEffect(() => {
    roles.forEach((role) => {
      if (!rolesRef) return;

      const userCount = list.filter((user) => {
        if (role === 'Online') return !user.role;
        return user.role === role;
      }).length;

      userCount === 0
        ? rolesRef.current[role].classList.add('hidden')
        : rolesRef.current[role].classList.remove('hidden');

      setUserCountStrs((prev) => ({
        ...prev,
        [role]: ` - ${userCount}`,
      }));
    });
  }, [roles, rolesRef, list]);

  return userCountStrs;
}
