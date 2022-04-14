import type { APIError } from "./error";

export interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

export interface PostsState {
  loading: boolean;
  data: Post[] | [];
  total: number | null;
  error: APIError | null;
}

export interface SelectedPostState {
  loading: boolean;
  data: Post | null;
  error: APIError | null;
}

export interface AddPostState {
  loading: boolean;
  error: APIError | null;
}

export type AddPostRequest = {
  title: string;
  author: string;
  content: string;
};

export type AddPostInput = keyof AddPostRequest;
