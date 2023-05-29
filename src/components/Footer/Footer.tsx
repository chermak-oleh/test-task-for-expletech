/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

export const Footer: React.FC = () => {
  const backgroundImageUrl
  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1599px-Flag_of_Ukraine.svg.png?20100406171642';

  const footerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div className="content has-text-centered has-text-white">
        <p>SPA made by Oleh Chermak</p>
      </div>
    </footer>
  );
};
