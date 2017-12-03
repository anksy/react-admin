import {takeLatest} from 'redux-saga/effects'
import {login, logout, profile} from "./admin";

export default function* Sagas(){
	yield takeLatest("Admin-login", login);
	yield takeLatest("Admin-logout", logout);
	yield takeLatest("Admin-profile", profile);
}