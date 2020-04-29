import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import Item from '../../components/Item/Item';
import { getInfo } from '../../helpers/info';
import './style.scss';

const Home = inject('store')(observer((props) =>{
	const { setMessage, setInfo, info, setAuth } = props.store;

	useEffect(() => {
		try {
			const fetchDataAsync = async () => {
				const data  = await getInfo(setMessage);
				if (!data) {
					setAuth('', false);
					props.history.push('/register')
				} else {
					console.log(data);
					setInfo(data);
				}
			};
			fetchDataAsync();
		} catch (e) {
			console.log(e)
		}
	}, []);

	return(
		<div className="container">
			<div className="items">
				{/*<Item label="Test" value={3}/>*/}
				{/*<Item label="Test3" value={6}/>*/}
				{/*<Item label="Test hjkhjk" value={3}/>*/}
				{/*<Item label="Test3" value={6}/>*/}
			</div>
		</div>
)}));

export default Home;
