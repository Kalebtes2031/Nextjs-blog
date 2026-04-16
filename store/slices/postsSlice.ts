import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  userId: number;
}

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
  page: 1,
  total: 0,
  hasMore: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //  FETCH POSTS
    fetchPostsRequest: (state, action: PayloadAction<{ page: number }>) => {
      state.loading = true;
      state.error = null;
    },

    fetchPostsSuccess: (
      state,
      action: PayloadAction<{ posts: Post[]; total: number; page: number }>
    ) => {
      state.loading = false;
      const { posts, total, page } = action.payload;

      if (page === 1) {
        state.posts = posts;
      } else {
        // Append unique posts only
        const existingIds = new Set(state.posts.map((p) => p.id));
        const uniqueNewPosts = posts.filter((p) => !existingIds.has(p.id));
        state.posts = [...state.posts, ...uniqueNewPosts];
      }

      state.total = total;
      state.hasMore = state.posts.length < total;
    },

    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //  SINGLE POST
    fetchPostByIdRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },

    fetchPostByIdSuccess: (state, action: PayloadAction<Post>) => {
      state.loading = false;
      state.selectedPost = action.payload;
    },

    fetchPostByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //  CREATE POST (for admin)
    createPostRequest: (
      state,
      _action: PayloadAction<{ title: string; body: string }>
    ) => {
      state.loading = true;
    },

    createPostSuccess: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      state.loading = false;
    },

    createPostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // SEARCH POSTS
    searchPostsRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    searchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },

    searchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE POST
    updatePostRequest: (
      state,
      _action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) => {
      state.loading = true;
    },

    updatePostSuccess: (state, action: PayloadAction<Post>) => {
      state.loading = false;
      state.posts = state.posts.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
      if (state.selectedPost?.id === action.payload.id) {
        state.selectedPost = action.payload;
      }
    },

    updatePostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE POST
    deletePostRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },

    deletePostSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      if (state.selectedPost?.id === action.payload) {
        state.selectedPost = null;
      }
    },

    deletePostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET
    clearPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;