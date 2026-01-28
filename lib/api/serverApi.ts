import { User } from '../../types/user';
import nextServer from './api';
import { cookies } from 'next/headers';
import { Note } from '../../types/note';
import type { AxiosResponse } from 'axios';


export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookieStore = await cookies();

  return nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async (): Promise<Note[]> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
