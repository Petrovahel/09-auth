import { AxiosError } from 'axios';

export type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export type ApiError = AxiosError<ApiErrorResponse>;
