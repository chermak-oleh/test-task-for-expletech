/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import apiCommentsReducer from '../slices/apiCommentsSlice';
import apiPostsReducer from '../slices/apiPostsSlice';

export const store = configureStore({
  reducer: {
    apiComments: apiCommentsReducer,
    apiPosts: apiPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
