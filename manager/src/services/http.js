import axios from 'axios';
import Session from './session';

/*Setting up interceptors with axios*/
/*it supports add/remove interceptors - 2017dec*/
// Add a request interceptor
axios.interceptors.request.use( function(config) {
  	// Do something before request is sent
    const token = Session.getSession('token'); 
    if(token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
  	return config;
}, function (error) {
  	// Do something with request error
  	return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use( function(response) {
  	// Do something with response data
  	return response;
},  function(error) {
	if(!error.response && error.message === 'Network Error'){
		console.log("network error");
	}
  	// Do something with response error
  	return Promise.reject(error);
});


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
			.then(response => resolve(response.data))
			.catch(error => reject(error.response.data));
		});
	}
}