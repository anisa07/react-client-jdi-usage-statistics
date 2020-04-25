import React, { useState } from 'react';
import Input from '../components/Input/Input';
import { auth } from '../routes';
import './style.scss';

const User = (props) => {
  const [formType, setFormType] = useState('login');

  const [key, setKey] = useState('');

  const [login, setLogin] = useState('');
  const [errLogin, setErrLogin] = useState(null);

  const [password, setPassword] = useState('');
  const [errPwd, setErrPwd] = useState(null);

  const [password2, setPassword2] = useState('');
  const [errPwd2, setErrPwd2] = useState(null);

  const loginForm = () => (
    <form className="form login-form">
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
      <input type="submit" value="Login" className="default-button login" />
      <button onClick={() => { setFormType('register'); }} className="default-button switch">Switch to Register Form</button>
    </form>
  	);

  const registerForm = () => (
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
      <input type="submit" value="Register" className="default-button login"/>
      <button onClick={() => { setFormType('login'); }} className="default-button switch">Switch to Login Form</button>
    </form>
  );

  if (formType === 'login') return loginForm();
  if (formType === 'register') return registerForm();
};

export default User;
