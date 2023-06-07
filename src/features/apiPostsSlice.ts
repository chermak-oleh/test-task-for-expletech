/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createPost, getApiPosts } from '../api/getApiData';
import { Post } from '../types/post';
import { Status } from '../types/status';
import { NewPost } from '../types/newPost';

export interface State {
  posts: Post[];
  status: Status;
}

const initialState: State = {
  posts: [],
  status: Status.Loading,
};

export const loadPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  () => {
    const loadedPosts: Promise<Post[]> = getApiPosts();

    return loadedPosts;
  },
);

export const createPostAsync = createAsyncThunk(
  'posts/addPost',
  (post: NewPost) => {
    const createdPost = createPost(post);

    return createdPost;
  },
);

export const postsSlice = createSlice({
  name: 'apiPosts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostsAsync.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(loadPostsAsync.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.posts = action.payload;
      })
      .addCase(loadPostsAsync.rejected, (state) => {
        state.status = Status.Failed;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createPostAsync.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export default postsSlice.reducer;
