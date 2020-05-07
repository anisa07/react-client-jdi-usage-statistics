import React from 'react';
import { observer, inject } from "mobx-react";
import { Routes } from './routes-client';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import './styles/style.scss';
import './app.scss';

const App = inject('store')(observer((props) => {
	const { message, setMessage } = props.store;
	const clearMessage = () => {
		setMessage('')
	};
	return (<main className="main">
			<Header/>
			<div className="page-container">
				<Routes/>
        {message && <Modal message={message} clearMessage={clearMessage}/>}
			</div>
			<Footer/>
		</main>)
}));

export default App;
