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
  },
});

const selfSelector = (state: RootState) => state[POSTS];

const postsSelector = createSelector(selfSelector, (state) => state.posts);

export const PostsSelector = {
  posts: createSelector(postsSelector, (posts) => posts.data),
  total: createSelector(postsSelector, (posts) => posts.total),
};

export const pageSelector = createSelector(selfSelector, (state) => state.page);

export const postsAction = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
