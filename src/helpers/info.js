import { URL } from '../../config';
import { clearStorage, getFromStorage } from './session';

export const getInfo = async(setMessage) => {
	try {
		const itemStorage = getFromStorage();
		const result = await fetch(URL + 'jdi/usage/statistic/info', {
			headers: new Headers({
				'Authorization': 'Bearer '+ itemStorage.token,
				'Content-Type': 'application/json'
			}),
		});
		if (result.status === 401) {
			clearStorage();
			setMessage('User is not authorised!');
		}
		if (result.status === 200) {
			return result.json();
		}
	} catch (e) {
		setMessage(e.message)
	}
};
