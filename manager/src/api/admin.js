import Http from '../services/http';

export function loginCall(data){
	return new Promise((resolve, reject) => {
		Http.Post(window.admin.login, data.data)
		.then(response => resolve(response))
		.catch(error => reject(error));
	});
}

export function profileCall(){
	return new Promise((resolve, reject) => {
		Http.Get(window.admin.profile)
		.then(response => resolve(response))
		.catch(error => reject(error));
	});
}