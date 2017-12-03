import Session from '../services/session';

const initState = {
	user : Session.getSession("user"),
	token : Session.getSession("token")
};

const _reducer = "_reducer";

export default function admin(state=initState, data){
	switch(data.type){
		case "Admin-login"+_reducer: {
			return {...state, token: "data.admin.token"};
		}

		case "Admin-logout"+_reducer: {
	        return {...state, token:null, user:null};
		}

		case "Admin-profile"+_reducer: {
	        return {...state};
		}

		default : {
			return state;
		}
	}
}