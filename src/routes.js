import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import { getFromStorage } from './helpers/session'

const LazyLoadPage = loadable(({page}) => import(`./pages/${page}/${page}`));

const PrivateRoute = ({ component, ...rest }) => {
	const token = (getFromStorage() || {}).token;

	return (
		<Route {...rest}>
			{ !token ? <LazyLoadPage page={component} /> : <Redirect to="/register" /> }
		</Route>
	)
};

const AuthRoute = ({ component, ...rest }) => {
	const token = (getFromStorage() || {}).token;

	return (
		<Route {...rest}>
			{ !token ? <LazyLoadPage page={component} /> : <Redirect to="/" /> }
		</Route>
	)
};

export const Routes = () => (
	<Switch>
		<PrivateRoute
			exact
			path="/"
			component="Home"
		/>
    <AuthRoute
      exact
      path="/register"
      component="User"
    />
		<Route>
			<LazyLoadPage page="NotFound" />
		</Route>
	</Switch>
);
