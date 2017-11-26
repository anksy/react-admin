import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

/*importing components...*/
import App from '../components/App';
import Dashboard from '../components/dashboard/dashboard';
import Login from '../components/login/login';
import NotFound from '../components/errors/404';

export default class AppRouter extends React.Component{
	render(){
		return(
			<Router history={this.props.history}>
				<Route path='/' component={App}>
					<IndexRoute component={Dashboard}/>  
					<Route path='/login' component={Login}/> 
					<Route path='*' component={NotFound}/> 
				</Route>
			</Router>
		);
	}
}