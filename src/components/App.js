import React, { Component } from 'react';
import { connect } from 'react-redux';

/*import Element*/
import Header from './elements/header';
import Footer from './elements/footer';

class App extends Component {
  render() {
    return (
        <div id="wrapper" className={!this.props.isLoggedIn?'login':'dashboard'}>
          <Header show={this.props.isLoggedIn} />  
          	{this.props.children}
          <Footer show={this.props.isLoggedIn}/>
        </div>
    );
  }
}


function mapStatesToProps(state){
	return({
		isLoggedIn : state.users.isLoggedIn
	});
}

export default connect(mapStatesToProps)(App);