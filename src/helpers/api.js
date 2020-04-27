import { URL } from '../../config';
import { setToStorage } from './session';

export const signIn = async ({ user, password }, setError) => {
	try {
		const response = await fetch(URL + 'jdi/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user,
				password
			})
		});
		const json = await response.json();
		setToStorage(json);
		return json;
	} catch (e) {
		console.log('e.message', e.message);
		setError(e.message);
	}
};
