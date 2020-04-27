import {observable, action} from 'mobx';

class Store {
	constructor(initialState){
		// console.log(initialState);
	}
	@observable info = {};

	@observable message = '';

	@observable isAuthenticated = false;

	@observable user = '';

	@action setMessage = (data) => {
		this.message = data;
	};

	@action setInfo = (data) => {
		this.info = data;
	};

	@action setAuth = ({user, status}) => {
		this.isAuthenticated = status;
		this.user = user;
	};
}

// const store = new Store();
export default Store;