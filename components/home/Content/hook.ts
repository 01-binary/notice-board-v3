import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";

import {
  PostsSelector,
  pageSelector,
  postsAction,
  SelectedPostSelector,
} from "store/modules/posts";
import { useGetPostListQuery } from "apis";

import { CONTENT_LIMIT } from "assets/string";
import type { Post } from "interface/posts";

const useContent = () => {
  const dispatch = useAppDispatch();

  const [rawPosts, total] = [
    useAppSelector(PostsSelector.posts),
    useAppSelector(PostsSelector.total),
  ];

  const [selectedPostLoading, selectedPost, selectedPostError] = [
    useAppSelector(SelectedPostSelector.loading),
    useAppSelector(SelectedPostSelector.data),
    useAppSelector(SelectedPostSelector.error),
  ];

  const page = useAppSelector(pageSelector);
  const { isLoading: postsLoading } = useGetPostListQuery(
    {
      page,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );


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

  const setPage = useCallback(() => {
    dispatch(postsAction.setPage({ page: page + 1 }));
  }, [dispatch, page]);

  return {
    postsLoading,
    selectedPostLoading,
    setPage,
    posts,
    selectedPost,
    isNeedMoreFetch,
  };
};

export default useContent;
