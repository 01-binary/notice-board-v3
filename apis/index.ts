import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { now } from "utils/day";
import type { Post, AddPostRequest, getPostListRequest } from "interface/posts";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getPostList: builder.query<
      { posts: Post[]; total: number },
      getPostListRequest
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/posts?_limit=${limit}&_page=${page}`,
      transformResponse: (res: Post[], meta) => {
        return {
          posts: res,
          total: Number(meta?.response?.headers.get("X-Total-Count")) || 0,
        };
      },
    }),
    getPostDetailInformation: builder.mutation<Post, number>({
      query: (postId) => `/posts/${postId}`,
    }),
    addPost: builder.mutation<Post, AddPostRequest>({
      query: (addPostRequest) => ({
        url: `posts`,
        method: "POST",
        body: { ...addPostRequest, createdAt: now() },
      }),
    }),
  }),
});

export const {
  useGetPostListQuery,
  useGetPostDetailInformationMutation,
  useAddPostMutation,
} = api;
