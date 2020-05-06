import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import { getFromStorage } from './helpers/session'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = (getFromStorage() || {}).token;
	return (<Route
		{...rest}
		render={(props) => {
			return (!!token ? <Component {...props} /> : <Redirect to="/register"/>)
		}}
	/>)
};

const AuthRoute = ({ component: Component, ...rest }) => {
	const token = (getFromStorage() || {}).token;
	return (<Route
		{...rest}
		render={(props) => {
			return (!token ? <Component {...props} /> : <Redirect to="/"/>)
		}}
	/>)
};

export const Routes = () => (
	<Switch>
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
	</Switch>
);
