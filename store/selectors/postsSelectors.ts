import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";

export const selectPostsState = (state: RootState) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.posts
);

export const selectSelectedPost = createSelector(
  [selectPostsState],
  (postsState) => postsState.selectedPost
);

export const selectPostsLoading = (state: RootState) => state.posts.loading;

export const selectPostsError = (state: RootState) => state.posts.error;

export const selectHasMorePosts = (state: RootState) => state.posts.hasMore;
