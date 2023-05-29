import React from 'react';

type Props = {
  onAddPostButton: () => void;
};

export const NavBar: React.FC<Props> = ({ onAddPostButton }) => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <strong className="navbar-item">Carousel of Posts</strong>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-info" type="button" onClick={onAddPostButton}>
              <strong>Add post</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
