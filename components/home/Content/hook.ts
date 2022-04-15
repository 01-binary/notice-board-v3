import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";

import {
  PostsSelector,
  AddPostSelector,
  pageSelector,
  postsAction,
  SelectedPostSelector,
} from "store/modules/posts";
// import { postsAsyncAction } from "@src/store/modules/posts/saga";

import { CONTENT_LIMIT } from "assets/string";
import type { Post } from "interface/posts";

const useContent = () => {
  const dispatch = useAppDispatch();

  const [postsLoading, rawPosts, postsError, total] = [
    useAppSelector(PostsSelector.loading),
    useAppSelector(PostsSelector.data),
    useAppSelector(PostsSelector.error),
    useAppSelector(PostsSelector.total),
  ];
  const [addPostLoading, addPostError] = [
    useAppSelector(AddPostSelector.loading),
    useAppSelector(AddPostSelector.error),
  ];

  const [selectedPostLoading, selectedPost, selectedPostError] = [
    useAppSelector(SelectedPostSelector.loading),
    useAppSelector(SelectedPostSelector.data),
    useAppSelector(SelectedPostSelector.error),
  ];

  const page = useAppSelector(pageSelector);

  const posts = useMemo(
    () =>
      rawPosts.map((post: Post) => ({
        id: post.id,
        title: post.title,
        author: post.author,
        createdAt: post.createdAt,
      })),
    [rawPosts],
  );

  const isNeedMoreFetch = useMemo(() => {
    return !!total && CONTENT_LIMIT * page < total;
  }, [page, total]);

  //   const getPosts = useCallback(() => {
  //     dispatch(postsAsyncAction.getPosts.request({ page }));
  //   }, [dispatch, page]);

  const setPage = useCallback(() => {
    dispatch(postsAction.setPage({ page: page + 1 }));
  }, [dispatch, page]);

  //   useEffect(() => {
  //     getPosts();
  //   }, [page]);

  return {
    postsLoading,
    addPostLoading,
    selectedPostLoading,
    setPage,
    posts,
    selectedPost,
    isNeedMoreFetch,
    // getPosts
  };
};

export default useContent;
