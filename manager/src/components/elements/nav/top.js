import React from 'react';

/*import images*/
import ProfileImage from '../../../assets/img/user.png';

export default class Top extends React.Component{
	render(){
		return(
			<ul className="nav navbar-top-links navbar-right">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="">
                  <img src={ProfileImage} className="img-responsive img-circle" alt="user" />
                </a>
                <ul className="dropdown-menu dropdown-user right-swip">
                  <li><a href=""><i className="fa fa-user fa-fw"></i> User Profile</a>
                  </li>
                  <li><a href=""><i className="fa fa-gear fa-fw"></i> Settings</a>
                  </li>
                  <li><a href=""><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                  </li>  
                </ul>
              </li>
            </ul>
		);
	}
}