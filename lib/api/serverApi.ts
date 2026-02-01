import { User } from '../../types/user';
import nextServer from './api';
import { cookies } from 'next/headers';
import { Note } from '../../types/note';


export const getMe = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();

    const res = await nextServer.get<User>(`/users/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.data;
  } catch (err: any) {
    console.error('getMe error:', err.response?.status, err.message);
    return null; 
  }
};

export const checkSession = async () => {
    const cookieStore = await cookies();

    const res = await nextServer.get(`/auth/session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res;
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
