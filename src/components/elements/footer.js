import React, {Component} from 'react';

export default class Footer extends Component{
	render(){
		
		/*if user is not logged in then return empty */
		if(!this.props.show) return("");
		
		return(
			<footer className="footer"> © 2017 Admin</footer>
		);
		
	}
}