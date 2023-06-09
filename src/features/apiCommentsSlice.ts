/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiComments } from '../api/getApiData';
import { Comment } from '../types/comment';
import { Status } from '../types/status';

export interface State {
  comments: Comment[],
  status: Status;
}

const initialState: State = {
  comments: [],
  status: Status.Loading,
};

export const loadCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const loadedComments: Comment[] = await getApiComments();

    return loadedComments;
  },
);

export const commentsSlice = createSlice({
  name: 'apiComments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsAsync.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(loadCommentsAsync.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.comments = action.payload;
      })
      .addCase(loadCommentsAsync.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export default commentsSlice.reducer;
