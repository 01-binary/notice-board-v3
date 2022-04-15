import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { createLogger } from "redux-logger";

import rootReducer from "store/modules";
import { api } from "apis";

const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(createLogger())
        .concat(api.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};

type Store = ReturnType<typeof makeStore>;

export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
