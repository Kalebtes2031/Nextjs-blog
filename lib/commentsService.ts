import { api } from "./api";

export const commentsService = {
  getCommentsByPostId: async (postId: number) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  getAllComments: async () => {
    const response = await api.get("/comments");
    return response.data;
  },

  addComment: async (commentData: { body: string; postId: number; userId: number }) => {
    const response = await api.post("/comments/add", commentData);
    return response.data;
  },
};
