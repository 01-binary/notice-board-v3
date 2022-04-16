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
