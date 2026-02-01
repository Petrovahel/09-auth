import axios from 'axios';

const nextServer = axios.create({
  baseURL: `/api`,
  withCredentials: true,
});

export default nextServer;
