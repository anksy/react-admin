import {call, put} from 'redux-saga/effects';
import {loginCall, profileCall} from "../api/admin";
import Session from "../services/session";
export function* login(action){
	
	try{
		const adminData =  yield call(loginCall, action);
		yield put({
			type : "Admin-login_reducer",
			admin : adminData,
		});
		action.success(adminData);
	}
	catch(e){
		action.error(e);
	}
}

export function* logout(action){
	try{
		/*Clearing Sessions*/
		Session.clearSession("token");
		Session.clearSession("user");
		yield put({
			type : "Admin-logout_reducer"
		});
		action.success(true);
	}
	catch(e){
		action.error(e);
	}
}

export function* profile(action){
	const profile = yield call(profileCall);
	try{
		yield put({
			type : "Admin-profile_reducer"
		});
		action.success(true);
	}
	catch(e){
		action.error(e);
	}
}