import React, { useState } from 'react';
import Input from '../Input/Input';
import { validateUsername, validatePassword } from '../../helpers/validators'

const LoginForm = (props) => {
	const [login, setLogin] = useState('');
	const [errLogin, setErrLogin] = useState(null);

	const [password, setPassword] = useState('');
	const [errPwd, setErrPwd] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		const userError = validateUsername(login);
		const passwordError = validatePassword(password);

		if (userError) return setErrLogin(userError);
		if (passwordError) return setErrPwd(errPwd);

		await props.onLogin(login, password);
	};

	return <form className="form login-form">
		<h3>Login Form</h3>
		<Input
			type="text"
			label="Username"
			value={login}
			error={errLogin}
			onChange={setLogin}
		/>
		<Input
			type="password"
			label="Password"
			value={password}
			error={errPwd}
			onChange={setPassword}
		/>
		<input type="submit" value="Login" className="default-button login" onClick={handleLogin} />
		<button onClick={props.setRegister} className="default-button switch">Switch to Register Form</button>
	</form>
};

export default LoginForm;
