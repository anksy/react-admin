import React, {Component} from 'react';
import {connect} from 'react-redux';

/*import Element*/
import Topnav from './nav/top';
import Leftnav from './nav/left';
/*import images*/
import Logo from '../../assets/img/logo.png';

class Header extends Component{
	render(){
    /*if user is not logged in then return empty */
    if(!this.props.isAdminLoggedIn) return(null);
     
		return(
			<nav className="navbar navbar-default navbar-static-top" >
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="">
                <img src={Logo} className="img-responsive" alt="Logo" />
              </a>          
            </div>
            
            <Topnav />
            <Leftnav />
          </nav>
		);
	}
}

/*get props*/
function mapStatesToProps(state){
  return({
    isAdminLoggedIn : (state.admin.token)?true:false
  });
}

export default connect(mapStatesToProps)(Header);