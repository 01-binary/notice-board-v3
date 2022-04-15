import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { postsReducer, POSTS } from "store/modules/posts";
import { api } from "apis";

const combinedReducer = combineReducers({
  [POSTS]: postsReducer,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combinedReducer(state, action);
};

export default rootReducer;
