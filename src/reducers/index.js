import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
//import { formReducer } from 'redux-form';

/*import component level reducers*/
import users from "./users";

export const reducers = combineReducers({
	routing : routerReducer,
	//form : formReducer,
	users : users
});

/*loading and calling reducers dynamically*/
export function reducerCall(state, action, reducerClass){
	/*get the method from action*/
	const [, method] = action.type.split(".");

	/*load all methods from current reducer class*/
	const methods = Object.getOwnPropertyNames(reducerClass).filter(name => {
		if(!["length","name","prototype"].includes(name)) return name;
	})

	/*finally return state*/
	if(methods.find(x => x===method)){
		/*if current action is available*/
		let newState = cloneObject(state);
		return reducerClass[method](newState, action);
	}else{
		/*if no such action registered then return state*/
		return state;
	}
};

function cloneObject(object) {
	return JSON.parse(JSON.stringify(object));
}