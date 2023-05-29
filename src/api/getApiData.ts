import { Comment } from '../types/Comment';
import { NewPost } from '../types/NewPost';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getApiPosts = (): Promise<Post[]> => {
  return client.get('posts');
};

export const getApiComments = (): Promise<Comment[]> => {
  return client.get('comments');
};

export const createPost = (post: NewPost) => {
  return client.post<Post>('posts', post);
};
