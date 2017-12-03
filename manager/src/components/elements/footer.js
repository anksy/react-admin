import React, {Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component{
	render(){
		
		/*if user is not logged in then return empty */
		if(!this.props.isAdminLoggedIn) return(null);
		
		return(
			<footer className="footer"> &copy; 2017 {window._env.app}</footer>
		);
		
	}
}

/*get props*/
function mapStatesToProps(state){
  return({
    isAdminLoggedIn : (state.admin.token)?true:false
  });
}

export default connect(mapStatesToProps)(Footer);