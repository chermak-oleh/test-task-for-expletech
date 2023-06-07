/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import apiCommentsReducer from '../features/apiCommentsSlice';
import apiPostsReducer from '../features/apiPostsSlice';

export const store = configureStore({
  reducer: {
    apiComments: apiCommentsReducer,
    apiPosts: apiPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
