import nextServer from "./api";
import { User, RegisterRequest, UpdateUser, LoginRequest } from "../../types/user";
import { Note, NewNote, NoteTag, NotesResponse } from "../../types/note";


export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
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

export const updateMe = async (userData: UpdateUser): Promise<User> =>  {
    const endPoint = '/users/me';

    const response = await nextServer.patch<User>(endPoint, userData);
    
    return response.data;
}

export const fetchNotes = async (
    page: number,
    perPage: number,
    search?: string,
    tag?: NoteTag 
): Promise<NotesResponse> => {
    const params: Record<string, string | number> = { page, perPage };
    if (search) params.search = search;
    if (tag) params.tag = tag;
    
    const endPoint = '/notes';

    const response = await nextServer.get<NotesResponse>(endPoint, { params});
    
    return response.data;
};

export const fetchNoteByID = async (id: string): Promise<Note> => {
    const endPoint = `/notes/${id}`;

    const response = await nextServer.get<Note>(endPoint);
        
    return response.data;
}


export const createNote = async (note: NewNote): Promise<Note> => {
    const endPoint = `/notes`;

    const response = await nextServer.post<Note>(endPoint, note);

    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const endPoint = `/notes/${id}`;

    const response = await nextServer.delete<Note>(endPoint);

    return response.data;
};





