import React, { useEffect, useMemo } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadPostsAsync } from '../../features/apiPostsSlice';
import { loadCommentsAsync } from '../../features/apiCommentsSlice';
import { PrepPost } from '../../types/prepPost';

export const Slider: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.apiPosts.posts);
  const comments = useAppSelector(state => state.apiComments.comments);

  useEffect(() => {
    dispatch(loadPostsAsync());
    dispatch(loadCommentsAsync());
  }, []);

  const preparePosts: PrepPost[] = useMemo(() => {
    return posts.map(post => {
      const findComments = comments.filter(comment => comment.postId === post.id);

      return {
        ...post,
        comments: findComments,
      };
    });
  }, [posts, comments]);

  return (
    <AwesomeSlider>
      {preparePosts.map(({
        id,
        title,
        body,
        comments: postComments,
      }) => {
        return (
          <div className="slider-content" key={id}>
            <div className="box post-content">
              <p className="title">
                {title}
              </p>
              <p className="subtitle">
                {body}
              </p>
              <h1 className="title mt-2">Comments:</h1>
              {postComments.length > 0
                ? postComments.map(({
                  id: commentId,
                  name,
                  email,
                  body: commentBody,
                }) => (
                  <article className="message is-dark" key={commentId}>
                    <div className="message-header">
                      <p>{`${name} / ${email}`}</p>
                    </div>
                    <div className="message-body">
                      {commentBody}
                    </div>
                  </article>
                ))
                : (
                  <p>There is no comments yet</p>
                )}
            </div>
          </div>
        );
      })}
    </AwesomeSlider>
  );
};
