import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import Item from '../../components/Item/Item';
import { getInfo } from '../../helpers/info';
import './style.scss';

const Home = inject('store')(observer((props) => {
	const { setMessage, setInfo, info, setAuth } = props.store;
	const [result, setResult] = useState(undefined);

	useEffect(() => {
		try {
			const fetchDataAsync = async() => {
				const data = await getInfo(setMessage);
				if (!data) {
					setAuth('', false);
					props.history.push('/register')
				} else {
					setInfo(data);
					if (data.results && !!data.results.length) {
						setResult(data.results[data.results.length - 1])
					}
				}
			};
			fetchDataAsync();
		} catch (e) {
			console.log(e)
		}
	}, []);

	return (<>
			{result && <div className="container">
				<div className="items">
					<Item label="Unique users" value={result.uniqueUsers}/>
					<Item label="New users last month" value={result.newUsers}/>
					<Item label="Sessions last month" value={result.sessions}/>
					<Item label="Active users last month" value={result.activeUsers}/>
					<Item label="Actively used versions" value={(info.activeUsedVersions || []).join(', ')}/>
					<Item label="Last month usage intensity" value={info.lastMonthUsageIntensity}/>
					<Item label="New projects last month" value={result.newProjects}/>
					<Item label="Active projects last month" value={result.activeProjects}/>
				</div>
			</div>}
		</>)
}));

export default Home;
