import { Comment } from './Comment';

export interface PrepPost {
  userId: number,
  id: number,
  title: string,
  body: string,
  comments: Comment[],
}
