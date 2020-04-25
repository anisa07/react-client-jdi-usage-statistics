import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home/Home';
import User from './User/User';
import NotFound from './NotFound/NotFound';

export const auth = {
  // isAuthenticated: false,
  isAuthenticated: true,
  authenticate(cb) {
    if (sessionStorage && sessionStorage.getItem('__jdi-impossible_token')) {
      this.isAuthenticated = true;
    }
  },
  signout(cb) {
    if (sessionStorage) {
      sessionStorage.setItem('__jdi-impossible_token', '');
      this.isAuthenticated = false;
    }
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/register" />
      )}
    />
  )
};

export const Routes = (props) => (
  <Switch>
    <PrivateRoute
      exact
      path="/"
      component={Home}
    />
    <Route path="/register" component={User} />
    <Route component={NotFound} />
  </Switch>
);
