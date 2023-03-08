import { api } from './apiClient';

export const createPost = (body: any) => api.post('/post', body);
export const getAllPosts = () => api.get('/post');
export const getDetailedPost = (id: string) => api.get(`/post/${id}`);
export const likePost = (id: string | undefined, body: any) =>
  api.put(`/post/like/${id}`, body);
export const savePost = (id: string | undefined, body: any) =>
  api.put(`/post/save/${id}`, body);
