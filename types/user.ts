export interface User {
    email: string;
    username: string; 
    avatar: string;
}

export type RegisterRequest = {
  email: string;
  username: string;
  avatar: string;
};

export interface UpdateUser {
    username?: string;
    email?: string;
    avatar?: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};
