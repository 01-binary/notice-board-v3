import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import { api } from "apis";

import type { RootState } from "store";
import type { PostReduxState, Post } from "interface/posts";

export const POSTS = "posts";

const initialState: PostReduxState = {
  posts: {
    data: [],
    total: null,
  },
  selectedPost: {
    loading: false,
    data: null,
    error: null,
  },
  page: 1,
};

const postsSlice = createSlice({
  name: POSTS,
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getPostList.matchFulfilled,
        (state, action: PayloadAction<{ posts: Post[]; total: number }>) => {
          const { posts, total } = action.payload;
          state.posts.data = [...state.posts.data, ...posts];
          state.posts.total = total;
        },
      )
      .addMatcher(api.endpoints.addPost.matchFulfilled, (state) => {
        if (state.page !== 1) {
          state.posts.data = [];
          state.page = 1;
        }
      });

    // .addCase(
    //   `${postsAsyncAction.getSelectedPost.success}`,
    //   (state, action: PayloadAction<{ post: Post }>) => {
    //     state.selectedPost.loading = false;
    //     state.selectedPost.data = action.payload.post;
    //   },
    // )
  },
});

const selfSelector = (state: RootState) => state[POSTS];

const postsSelector = createSelector(selfSelector, (state) => state.posts);

export const PostsSelector = {
  posts: createSelector(postsSelector, (posts) => posts.data),
  total: createSelector(postsSelector, (posts) => posts.total),
};

const selectedPostSelector = createSelector(
  selfSelector,
  (state) => state.selectedPost,
);

export const SelectedPostSelector = {
  loading: createSelector(
    selectedPostSelector,
    (selectedPost) => selectedPost.loading,
  ),
  data: createSelector(
    selectedPostSelector,
    (selectedPost) => selectedPost.data,
  ),
  error: createSelector(
    selectedPostSelector,
    (selectedPost) => selectedPost.error,
  ),
};

export const pageSelector = createSelector(selfSelector, (state) => state.page);

export const postsAction = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
