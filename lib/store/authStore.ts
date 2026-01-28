//створіть Zustand-стор, який зберігає інформацію про користувача (user)
// та булеве значення isAuthenticated. Стор має методи setUser для запису
//  даних користувача після успішного логіну та clearIsAuthenticated
// для очищення стану під час виходу.

//Під час створення Zustand-стору в TypeScript використовуйте
// подвійні дужки після create, інакше типи визначаться некоректно.

// create<AuthStore>()((set) => ({ ... }))

// lib/store/authStore.ts

import { create } from 'zustand';
import { User } from '../../types/user';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
