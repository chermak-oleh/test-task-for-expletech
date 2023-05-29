import React, { useEffect, useMemo } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadPostsAsync } from '../../slices/apiPostsSlice';
import { loadCommentsAsync } from '../../slices/apiCommentsSlice';

export const Slider: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.apiPosts.posts);
  const comments = useAppSelector(state => state.apiComments.comments);

  useEffect(() => {
    dispatch(loadPostsAsync());
    dispatch(loadCommentsAsync());
  }, []);

  const preparePosts = useMemo(() => {
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
      {preparePosts.map(post => {
        const { id, title, body } = post;

        return (
          <div className="slider-content" key={id}>
            <div className="box" style={{ maxWidth: '750px', maxHeight: '600px', overflow: 'auto' }}>
              <p className="title">
                {title}
              </p>
              <p className="subtitle">
                {body}
              </p>
              <h1 className="title mt-2">Comments:</h1>
              {post.comments.length > 0
                ? post.comments.map(comment => {
                  const {
                    email, name,
                  } = comment;

                  return (
                    <article className="message is-dark" key={comment.id}>
                      <div className="message-header">
                        <p>{`${name} / ${email}`}</p>
                      </div>
                      <div className="message-body">
                        {comment.body}
                      </div>
                    </article>
                  );
                })
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
