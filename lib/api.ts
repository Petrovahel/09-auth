import axios from 'axios';
import type { Note } from '../types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const nextServer = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});


export type NoteTag =
  | 'Todo'
  | 'Work'
  | 'Personal'
  | 'Meeting'
  | 'Shopping';

export const NOTE_TAGS: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];


export interface CreateNoteInput {
  title: string;
  content: string;
  tag: NoteTag;
}

function getAuthHeaders() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const fetchNotes = async (page: number, perPage: number, search?: string, tag?: string) => {
  const res = await nextServer.get<{notes: Note[]; totalPages: number}>('/notes', {
    params: {  page, perPage, ...(search ? { search } : {}), ...(tag ? { tag } : {})  },
  });
  return res.data;
};


export function createNote(data: CreateNoteInput) {
  return nextServer
    .post<Note>(`/notes`, data, { headers: getAuthHeaders() })
    .then(res => res.data);
}

export function deleteNote(id: string): Promise<Note> {
  return nextServer
    .delete<Note>(`/notes/${id}`, {
      headers: getAuthHeaders(),
    })
    .then(res => res.data);
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

export type NewNoteData = {
  title: string;
  content: string;  
  tag: NoteTag;
}




