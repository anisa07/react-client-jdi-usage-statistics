import React, { useState } from 'react';
import Input from '../Input/Input';
import { validateUsername, validatePassword } from '../../helpers/validators';

const RegisterForm = (props) => {
	const [key, setKey] = useState('');

	const [login, setLogin] = useState('');
	const [errLogin, setErrLogin] = useState(null);

	const [password, setPassword] = useState('');
	const [errPwd, setErrPwd] = useState(null);

	const [password2, setPassword2] = useState('');
	const [errPwd2, setErrPwd2] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();
		const userError = validateUsername(login);
		const passwordError = validatePassword(password);

		if (userError) return setErrLogin(userError);
		if (passwordError) return setErrPwd(errPwd);

		// const auth = await signIn({ user: login, password }, setMessage);
	};

	return (
		<form className="form register-form">
			<h3>Register Form</h3>
			<Input
				type="text"
				label="Username"
				value={login}
				error={errLogin}
				onChange={setLogin}
			/>
			<Input
				type="password"
				label="Key"
				value={key}
				onChange={setKey}
			/>
			<Input
				type="password"
				label="Password"
				value={password}
				error={errPwd}
				onChange={setPassword}
			/>
			<Input
				type="password"
				label="Repeat password"
				value={password2}
				error={errPwd2}
				onChange={setPassword2}
			/>
			<input type="submit" value="Register" className="default-button login" onClick={handleRegister}/>
		</form>
	);
};

export default RegisterForm;
