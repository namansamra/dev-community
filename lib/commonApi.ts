import { api } from './apiClient';

export const createPost = (body: any) => api.post('/post', body);
