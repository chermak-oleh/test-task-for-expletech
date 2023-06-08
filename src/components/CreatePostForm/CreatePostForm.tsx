/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useAppDispatch } from '../../app/hooks';
import { createPostAsync } from '../../features/apiPostsSlice';

type Values = {
  userId: number,
  title: string,
  description: string,
};

type Errors = {
  title?: string,
  userId?: string,
  description?: string,
};

const usersIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CreatePostForm: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useAppDispatch();

  const initialValues: Values = {
    userId: 1,
    title: '',
    description: '',
  };

  const validate = (values: Values) => {
    const { userId, title, description } = values;

    const errors: Errors = {};

    if (!title || !title.trim()) {
      errors.title = 'Please enter a title';
    }

    if (!userId) {
      errors.userId = 'Please select id of user';
    }

    if (!description || !description.trim()) {
      errors.description = 'Please enter a description';
    }

    return errors;
  };

  const onFormSubmit = async ({ userId, title, description }: Values) => {
    const newPost = {
      userId,
      title: title.trim(),
      body: description.trim(),
    };

    dispatch(createPostAsync(newPost));

    setShowNotification(true);
  };

  const onCloseNotification = () => {
    setShowNotification(false);
  };

  if (showNotification) {
    return (
      <div className="notification is-success">
        <button className="delete" type="button" onClick={onCloseNotification}></button>
        <p>Post created successfully</p>
      </div>
    );
  }

  return (
    <Form
      onSubmit={onFormSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit }) => (
        <form className="container" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">User ID</label>
            <div className="control">
              <div className="select">
                <Field
                  name="userId"
                  component="select"
                >
                  {usersIds.map(id => (
                    <option key={id}>{id}</option>
                  ))}
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Title</label>

            <Field
              name="title"
              component="input"
              placeholder="Post title"
              type="text"
            >
              {({ meta, input }) => (
                <div className="control">
                  <input
                    className="input"
                    {...input}
                  />
                  {meta.error && meta.touched && <span className="has-text-danger">Please enter a title</span>}
                </div>
              )}
            </Field>
          </div>

          <div className="field">
            <label className="label">Description</label>

            <Field
              name="description"
              component="textarea"
              placeholder="Post description"
            >
              {({ meta, input }) => (
                <div className="control">
                  <textarea
                    className="textarea"
                    {...input}
                  />
                  {meta.error && meta.touched && <span className="has-text-danger">Please enter a description</span>}
                </div>
              )}
            </Field>
          </div>

          <button className="button is-info" type="submit">Add Post</button>
        </form>
      )}
    />
  );
};
