const key = '__jdi-impossible_token';

export const setToStorage = (data) => {
	if (sessionStorage) {
		sessionStorage.setItem(key, JSON.stringify(data));
	}
};

export const clearStorage = () => {
	if (sessionStorage) {
		sessionStorage.removeItem(key);
	}
};

export const getFromStorage = () => {
	if (sessionStorage) {
		const storageItem = JSON.parse(sessionStorage.getItem(key) || '{}');
		return storageItem
	}
};
