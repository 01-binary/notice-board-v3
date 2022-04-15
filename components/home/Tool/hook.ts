import { useCallback } from "react";
import { useAppSelector } from "store";

import type { AddPostRequest } from "interface/posts";
import { AddPostSelector, PostsSelector } from "store/modules/posts";

const useTool = () => {
  const [total] = [useAppSelector(PostsSelector.total)];
  const [addPostLoading, addPostError] = [
    useAppSelector(AddPostSelector.loading),
    useAppSelector(AddPostSelector.error),
  ];

  return {
    // addPost,
    addPostLoading,
    total,
  };
};

export default useTool;
