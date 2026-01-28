//fetchNotes
// fetchNoteById
// createNote
// deleteNote
// register - У разі успішної реєстрації має відбуватись автоматичний редірект
//    користувача на сторінку профілю /profile.
// login
// logout
// checkSession
// getMe
// updateMe
//Оголосіть у файлі lib/api/clientApi.ts функцію для запиту на автентифікацію користувача.
//У разі успішної автентифікації має відбуватись автоматичний редірект користувача на сторінку профілю /profile.

import nextServer from "./api";
import { User } from "../../types/user";


export type RegisterRequest = {
  email: string;
  userName: string;
  avatar: string;
};


export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};


export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};


export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};


export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};






