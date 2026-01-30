//перевіряє, чи користувач авторизований, і при переході на приватну сторінку
//  виконує повторну перевірку сесії. Якщо користувач неавторизований і
// намагається перейти на приватну сторінку, має виконуватися вихід і
// контент не відображатись. Під час перевірки показуйте лоедер.

'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
