import React from 'react';
import { auth } from '../../routes';
import './style.scss';

const Header = (props) => {
  const handleDeleteUser = () => {};
  const handleLogout = () => {};

  return (
    <header className="header">
      <h1>JDI Usage Statistics</h1>
      { auth.isAuthenticated && <button className="default-button button">Logout</button> }
      { auth.isAuthenticated && <button className="default-button button">Delete User</button> }
    </header>
  );
};

export default Header;
