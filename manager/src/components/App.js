import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppRouter from '../router/';

class App extends Component {
  render() {
    return (
        <div id="wrapper" className={!this.props.isAdminLoggedIn?'login':'dashboard'}>
          	<AppRouter history={this.props.history}/>
        </div>
    );
  }
}

function mapStatesToProps(state){
  return({
    isAdminLoggedIn : (state.admin.token)?true:false
  });
}

export default connect(mapStatesToProps)(App);