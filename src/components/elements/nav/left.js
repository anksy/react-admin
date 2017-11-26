import React from 'react';
import {Link} from 'react-router';

export default class Sidebar extends React.Component{
	render(){
		return(
			<div className="navbar-default sidebar" role="navigation">
              <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
                   <li className="active">
                    <Link to="/"><i className="fa fa-bullseye"></i>Dashboard</Link>
                   </li>

                   <li>
                    <Link to="/login"><i className="fa fa-lock"></i>Login</Link>
                   </li>
                </ul>
              </div>
            </div>
		);
	}
}