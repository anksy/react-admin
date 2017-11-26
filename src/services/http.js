import axios from 'axios';

export default class Http {
	static Get(url){
		return new Promise((resolve, reject) => {
			axios.get(url)
			.then(response => resolve(response))
			.catch(error => reject(error));
		});
	}


	static Post(url, data){
		return new Promise((resolve, reject) => {
			axios.post(url, data)
			.then(response => resolve(response))
			.catch(error => reject(error));
		});
	}
}