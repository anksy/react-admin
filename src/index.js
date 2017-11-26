import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';

/*adding css to admin*/
import './assets/css/admin.min.css';
import './assets/css/all_icons.css';
import './assets/css/animate.css';
import './assets/css/bootstrap.min.css';

import AppRouter from './router/';

import registerServiceWorker from './registerServiceWorker';

/*importing reducers*/
import { reducers } from './reducers/index';

/*Init the state throught out the application*/

const initialState = {
	users : {
		isLoggedIn : true
	}
};


let middleware = applyMiddleware(routerMiddleware(browserHistory));
const store = createStore(reducers, initialState, middleware);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<AppRouter history={history} />
	</Provider>, document.getElementById('root'));
registerServiceWorker();