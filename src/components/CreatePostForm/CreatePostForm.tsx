/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createPostAsync } from '../../features/apiPostsSlice';

export const CreatePostForm: React.FC = () => {
  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useAppDispatch();

  const usersIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const addNewPost = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    const newPost = {
      title: trimmedTitle,
      body: trimmedDescription,
      userId,
    };

    dispatch(createPostAsync(newPost));
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setDescription(value);
  };

  const clearForm = () => {
    setUserId(1);
    setTitle('');
    setDescription('');
    setError(false);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !description) {
      setError(true);

      return;
    }

    addNewPost();
    clearForm();
    setShowNotification(true);
  };

  const onCloseNotification = () => {
    setShowNotification(false);
  };

  const titleErrorCondition = !title && error;
  const descErrorCondition = !description && error;

  if (showNotification) {
    return (
      <div className="notification is-success">
        <button className="delete" type="button" onClick={onCloseNotification}></button>
        <p>Post created successfully</p>
      </div>
    );
  }

  return (
    <form onSubmit={onFormSubmit} className="container">
      <div className="field">
        <label className="label">User ID</label>
        <div className="control">
          <div className="select">
            <select value={userId} onChange={handleUserIdChange}>
              {usersIds.map(id => (
                <option key={id}>{id}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Post title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          {titleErrorCondition && (
            <span className="has-text-danger">Please enter a title</span>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Post description"
            value={description}
            onChange={handleDescriptionChange}
            required
          >
          </textarea>
          {descErrorCondition && (
            <span className="has-text-danger">Please enter a description</span>
          )}
        </div>
      </div>

      <button className="button is-info" type="submit">Add Post</button>
    </form>
  );
};
