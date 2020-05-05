import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import Item from '../../components/Item/Item';
import Chart from '../../components/Charts/Chart';
import { getInfo } from '../../helpers/info';
import './style.scss';

const Home = inject('store')(observer((props) => {
	const { setMessage, setInfo, info, setAuth } = props.store;
	const lastMonth = Date.now() - (3600000 * 24 * 30);
	const [ result, setResult ] = useState(undefined);
	const [ totalUsers, setTotalUsers ] = useState([]);
	// const [totalProjects, setTotalProjects] = useState([]);
	const [ intensity, setIntensity ] = useState([]);
	const [ activeSessions, setActiveSessions ] = useState([]);
	const [ newProjects, setNewProjects ] = useState([]);
	const [ activeProjects, setActiveProjects ] = useState([]);
	const [ activeUsers, setActiveUsers ] = useState([]);
	const [ newUsers, setNewUsers ] = useState([]);

	useEffect(() => {
		try {
			const fetchDataAsync = async() => {
				const data = await getInfo(setMessage);
				if (!data) {
					setAuth('', false);
					props.history.push('/register');
				} else {
					setInfo(data);
					if (data.results && !!data.results.length) {
						setResult(data.results[data.results.length - 1]);
					}

					const tUsers = [];
					const tProjects = [];
					const aSessions = [];
					const nUsers = [];
					const aUsers = [];
					const nProjects = [];
					const acProjects = [];

					data.results.forEach(dayData => {
						const d = new Date(dayData.resultDate);
						if (d.getTime() > lastMonth) {
							tUsers.push({ x: d, y: dayData.uniqueUsers });
							aSessions.push({ x: d, y: dayData.sessions});
							nUsers.push({ x: d, y: dayData.newUsers });
							aUsers.push({ x: d, y: dayData.activeUsers });
							nProjects.push({ x: d, y: dayData.newProjects});
							acProjects.push({ x: d, y: dayData.activeProjects})
						}
					});
					setTotalUsers(tUsers);
					setActiveSessions(aSessions);
					setNewProjects(nProjects);
					setActiveProjects(acProjects);
					setActiveUsers(aUsers);
					setNewUsers(nUsers);

					if (data.intensity && !!data.intensity.length) {
						const uIntensity = [];
						data.intensity.forEach(intensObj => {
							const d = new Date(intensObj.intensityDate);
							if (d.getTime() > lastMonth) {
								uIntensity.push({ x: d, y: intensObj.intensity });
							}
						});
						setIntensity(uIntensity);
					}
				}
			};
			fetchDataAsync();
		} catch (e) {
			console.log(e)
		}
	}, []);

	return (<>
		{result && <>
			<div className="container">
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
				<div className="charts">
					<Chart data={totalUsers} y="unique users"/>
					<Chart data={activeSessions} y="active sessions"/>
					<Chart data={intensity} y="intensity"/>
					<Chart data={newProjects} data2={activeProjects} y="new, active projects"/>
					<Chart data={newUsers} data2={activeUsers} y="new, active users"/>
				</div>
			</div>
		</>}
	</>)
}));

export default Home;
