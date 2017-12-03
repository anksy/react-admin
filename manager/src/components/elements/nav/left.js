import React from 'react';
import {Link} from 'react-router-dom';
import Session from '../../../services/session';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class Sidebar extends React.Component{
  constructor(props){
    super(props);
    /*bind this with current class object*/
    this.logout = this.logout.bind(this);
  }

	render(){
		return(
			<div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <ul className="nav" id="side-menu">
             <li className="active">
              <Link to="/"><i className="fa fa-bullseye"></i>Dashboard</Link>
             </li>
             <li>
              <Link to="/"><i className="fa fa-bullseye"></i>Plants</Link>
             </li>
             <li>
              <Link to="/"><i className="fa fa-bullseye"></i>Accessories</Link>
             </li>
             <li>
              <Link to="/"><i className="fa fa-bullseye"></i>Users</Link>
             </li>
             <li>
              <Link to="/"><i className="fa fa-bullseye"></i>Tools</Link>
             </li>
             <li>
              <Link to="/my-profile"><i className="fa fa-bullseye"></i>My Profile</Link>
             </li>
             <li>
              <Link to="/"><i className="fa fa-bullseye"></i>Settings</Link>
             </li>
             <li>
              <a onClick={this.logout} className='pointer'><i className="fa fa-lock"></i>Logout</a>
             </li>
          </ul>
        </div>
      </div>
		);
	}

  logout(){
    this.props.dispatch({
      type : "Admin-logout",
      success : (e) => {
        /*redirect user to login*/
        this.props.dispatch(push("/login"));  
      }
    });
  }
}

export default connect()(Sidebar);