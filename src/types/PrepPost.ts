import { Comment } from './comment';

export interface PrepPost {
  userId: number,
  id: number,
  title: string,
  body: string,
  comments: Comment[],
}
