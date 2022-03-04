import React from 'react';
const Header = () => {
  const sessionCode = sessionStorage.getItem('sessionCode');
  return <h1 className="main-heading">Session #{sessionCode}</h1>;
};
export default Header;