/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { CreatePostForm } from '../CreatePostForm';

type Props = {
  onCloseModalButton: () => void;
};

export const CreatePostModal: React.FC<Props> = React.memo(({ onCloseModalButton }) => (
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Create Post</p>
        <button className="delete" aria-label="close" type="button" onClick={onCloseModalButton}></button>
      </header>
      <section className="modal-card-body">
        <CreatePostForm />
      </section>
      <footer className="modal-card-foot">
      </footer>
    </div>
  </div>
));
