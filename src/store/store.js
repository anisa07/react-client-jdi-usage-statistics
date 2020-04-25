import {observable, action} from 'mobx';

class Store {
	constructor(initialState){
		// console.log(initialState);
	}
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

// const store = new Store();
export default Store;
