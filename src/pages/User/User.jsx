import React, { useState } from 'react';
import { observer, inject } from "mobx-react";
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { signIn } from '../../helpers/api';

import './style.scss';

const User = inject('store')(observer((props, context) => {
	const { setMessage, setAuth } = props.store;
  const [formType, setFormType] = useState('login');
  const setLogin = () => { setFormType('login'); };
  const setRegister = () => { setFormType('register'); };

	const login = async (user, password) => {
		const auth = await signIn({ user, password }, setMessage);

		if (auth && auth.user) {
			setAuth(auth.user, true);
      props.history.push('/')
		}
	};

	return (
		<>
			{formType === 'login' ? <LoginForm onLogin={login} setRegister={ setRegister } /> : <RegisterForm setLogin={ setLogin } />}
		</>
	);
}));

export default User;
