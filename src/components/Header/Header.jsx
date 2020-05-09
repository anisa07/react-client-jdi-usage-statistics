import React from 'react';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { signOut } from '../../helpers/api';
import './style.scss';

const Header = inject('store')(observer((props) => {
  const { isAuthenticated, user, setAuth } = props.store;

  const handleLogout = async () => {
    await signOut(user);
    setAuth('', false);
    props.history.push('/register');
  };

  return (
    <header className="header">
      <h1>JDI Usage Statistics</h1>
      { isAuthenticated && <button className="default-button button" onClick={handleLogout}>Logout</button> }
    </header>
  );
}));

export default withRouter(Header)
