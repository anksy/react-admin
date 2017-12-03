import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Session {
	static setSession(cookie, data){
		cookies.set(window._env.prefix+cookie, window.btoa(JSON.stringify(data)), { path: '/' });
	}

	static getSession(cookie){
		let data = cookies.get(window._env.prefix+cookie);
		return data?JSON.parse(window.atob(data)):'';
	}

	static clearSession(cookie){
		console.log("removing...", cookie);
		cookies.remove(window._env.prefix+cookie);
	}
}