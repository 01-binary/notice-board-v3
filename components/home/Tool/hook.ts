import { useAppSelector } from "store";

import { PostsSelector } from "store/modules/posts";
import { useAddPostMutation } from "apis";

const useTool = () => {
  const [total] = [useAppSelector(PostsSelector.total)];
  const [addPost, { isLoading: isAddPostLoading }] = useAddPostMutation();

  return {
    addPost,
    total,
    isAddPostLoading,
  };
};

export default useTool;
