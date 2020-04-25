import {observable, action} from 'mobx';

class Store {
	@observable info = {};

	@observable message = '';

	@observable isAuthenticated = false;

	@action setMessage = (data) => {
		this.message = data;
	};

	@action setInfo = (data) => {
		this.info = data;
	};

	@action setAuth = (data) => {
		this.isAuthenticated = data;
	}
}

const store = new Store();
export default store;
