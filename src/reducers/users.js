/*import reducer call function to make dynamic calls*/
import { reducerCall } from './index';


export default function users(state={}, action){
	return reducerCall(state, action, reducerClass);
}

class reducerClass{
	static abc(newState, action){
		return newState;
	}
}