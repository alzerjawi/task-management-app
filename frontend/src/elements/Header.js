import React from 'react';
import Description from './Description';

const Header = ({ authorizationIs }) => {
  return (
    <div className="header">
      <div className="logo">TaskMang</div>
      {!authorizationIs && <Description />}
    </div>
  );
};

export default Header;