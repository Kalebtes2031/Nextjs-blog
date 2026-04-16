import { api } from "./api";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
}

export const postsService = {
  getPosts: async (limit: number, skip: number) => {
    const response = await api.get(`/posts?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  getPostById: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  searchPosts: async (query: string) => {
    const response = await api.get(`/posts/search?q=${query}`);
    return response.data;
  },

  createPost: async (postData: { title: string; body: string; userId: number }) => {
    const response = await api.post("/posts/add", postData);
    return response.data;
  },

  updatePost: async (id: number, postData: Partial<{ title: string; body: string }>) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};
