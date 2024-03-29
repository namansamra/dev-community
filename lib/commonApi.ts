import { api } from './apiClient';

export const createPost = (body: any) => api.post('/post', body);
export const getAllPosts = () => api.get('/post');
export const getDetailedPost = (id: string) => api.get(`/post/${id}`);
export const likePost = (id: string | undefined, body: any) =>
  api.put(`/post/like/${id}`, body);
export const savePost = (id: string | undefined, body: any) =>
  api.put(`/post/save/${id}`, body);
export const followUser = (id: string | undefined, body: any) =>
  api.put(`/user/follow/${id}`, body);
export const getTags = (input: string) => api.get(`/tags/${input}`);

export const createComment = (body: any) => api.post(`/comment`, body);
export const likeComment = (id: string | undefined, body: any) =>
  api.put(`/comment/like/${id}`, body);
export const deleteComment = (id: string) => api.delete(`/comment/${id}`);
