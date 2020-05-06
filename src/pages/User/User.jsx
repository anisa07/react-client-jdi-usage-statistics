import React, { useState, Suspense } from 'react';
import { observer, inject } from "mobx-react";
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Input from '../../components/Input/Input';
import { signIn } from '../../helpers/api';
import { validateUsername, validatePassword } from '../../helpers/validators'

import './style.scss';

const User = inject('store')(observer((props, context) => {
	const { setMessage, setAuth } = props.store;
  const [formType, setFormType] = useState('login');

	const login = async (user, password) => {
		const auth = await signIn({ user, password }, setMessage);

		if (auth && auth.user) {
			setAuth(auth.user, true);
      props.history.push('/')
		}
	};

	return (
		<>
			{formType === 'login' ? <LoginForm onLogin={login}  /> : <RegisterForm />}
			{formType === 'login'
				? <button onClick={() => { setFormType('register'); }} className="default-button switch">Switch to Register Form</button>
				: <button onClick={() => { setFormType('login'); }} className="default-button switch">Switch to Login Form</button>}
		</>
	);
}));

export default User;
