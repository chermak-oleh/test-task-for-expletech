import { Comment } from '../types/comment';
import { NewPost } from '../types/newPost';
import { Post } from '../types/post';
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
