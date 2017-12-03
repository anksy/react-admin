import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

/*import private routes for authenticated users*/
import WithoutLogin from './withoutLogin';
import PrivateRoute from './private';
/*importing components...*/
import Dashboard from '../components/dashboard/dashboard';
import Profile from '../components/profile/profile';
import Login from '../components/login/login';
import NotFound from '../components/errors/404';

/*import Element*/
import Header from '../components/elements/header';
import Footer from '../components/elements/footer';

export default class AppRouter extends React.Component{
	render(){
		return(
			
			<ConnectedRouter history={this.props.history}>
				<div>
					<Header/>  
						<Switch>
							<PrivateRoute exact path='/' component={Dashboard} />
							<Route exact path='/my-profile' component={Profile} pname='Profile'/>
							<WithoutLogin exact path='/login' component={Login}/> 
							<PrivateRoute path='*' component={NotFound}/>
						</Switch>
					<Footer/>
				</div>
			</ConnectedRouter>
			  
		);
	}
}