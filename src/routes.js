import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import { getFromStorage } from './helpers/session'

export const auth = {
	isAuthenticated: getFromStorage()
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (<Route
			{...rest}
			render={(props) => {
				return (auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/register"/>)
			}}
		/>)
};

const AuthRoute = ({ component: Component, ...rest }) => {
  return (<Route
    {...rest}
    render={(props) => {
      return (!auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/"/>)
    }}
  />)
};

export const Routes = (props) => (<Switch>
		<PrivateRoute
			exact
			path="/"
			component={Home}
		/>
    <AuthRoute
      exact
      path="/register"
      component={User}
    />
		<Route component={NotFound}/>
	</Switch>);
