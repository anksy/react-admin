import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*import component level reducers*/
import admin from "./admin";

export const reducers = combineReducers({
	routing : routerReducer,
	form : formReducer,
	admin : admin
});