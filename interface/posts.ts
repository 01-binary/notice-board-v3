import type { APIError } from "./error";

export interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

export interface PostReduxState {
  posts: {
    data: Post[] | [];
    total: number | null;
  };
  selectedPost: {
    loading: boolean;
    data: Post | null;
    error: APIError | null;
  };
  addPost: {
    loading: boolean;
    error: APIError | null;
  };
  page: number;
}

export type AddPostRequest = {
  title: string;
  author: string;
  content: string;
};

export type getPostListRequest = {
  page: number;
  limit: number;
};

export type AddPostInput = keyof AddPostRequest;
