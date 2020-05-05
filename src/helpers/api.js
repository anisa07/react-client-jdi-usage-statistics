import { URL } from '../../config';
import { setToStorage, clearStorage } from './session';

export const signIn = async ({ user, password }, setError) => {
	try {
		const response = await fetch(URL + 'jdi/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
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
		console.log(e)
		setError(e.message);
	}
};

export const signOut = async (user, setError) => {
	try {
		await fetch(URL + 'jdi/logout', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user
			})
		});
		clearStorage();
	} catch (e) {
		console.log(e);
		setError(e.message);
	}
};
