import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    username: string;
  };
}

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },

    fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loading = false;
      state.comments = action.payload;
    },

    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addCommentRequest: (
      state,
      _action: PayloadAction<{ postId: number; body: string }>
    ) => {
      state.loading = true;
    },

    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
      state.loading = false;
    },

    addCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;