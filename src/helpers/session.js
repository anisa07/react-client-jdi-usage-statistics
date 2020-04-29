const key = '__jdi-impossible_token';

export const setToStorage = (data) => {
	if (typeof window !== 'undefined') {
		sessionStorage.setItem(key, JSON.stringify(data));
	}
};

export const clearStorage = () => {
	if (typeof window !== 'undefined') {
		sessionStorage.removeItem(key);
	}
};

export const getFromStorage = () => {
	if (typeof window !== 'undefined') {
		return JSON.parse(sessionStorage.getItem(key) || '{}');
	}
};
