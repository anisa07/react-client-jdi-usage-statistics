import {observable, action} from 'mobx';
import { getFromStorage } from '../helpers/session'

class Store {
	constructor(initialState){
	}
	@observable info = {};

	@observable message = '';

	@observable isAuthenticated = !!(getFromStorage() || {}).token;

	@observable user = (getFromStorage() || {}).user;

	@action setMessage = (data) => {
		this.message = data;
	};

	@action setInfo = (data) => {
		this.info = data;
	};

	@action setAuth = (user, status) => {
		this.isAuthenticated = status;
		this.user = user;
	};
}

export default Store;
