/*Importing env vars to application*/
import './utils/env/env';
/*Importing api urls for application*/
import './utils/api';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
/*import Sagas*/
import sagas from './sagas/index';
/*adding css to admin*/
import './assets/css/admin.min.css';
import './assets/css/all_icons.css';
import './assets/css/animate.css';
import './assets/css/bootstrap.min.css';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

/*importing reducers*/
import { reducers } from './reducers/index';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const store = createStore(reducers, middleware);

/*dispatch action first to Saga then reducer*/
sagaMiddleware.run(sagas);

ReactDOM.render(
	<Provider store={store}>
		<App history={history}/>
	</Provider>, document.getElementById('root'));
registerServiceWorker();