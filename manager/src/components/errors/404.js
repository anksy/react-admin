import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div id="page-wrapper">
        <div className="row page-titles">
          <div className="col-md-5 align-self-center">
            <h3 className="text-themecolor">404</h3>
          </div>
          <div className="col-md-7 align-self-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="">Home</a></li>
              <li className="breadcrumb-item"><a href="">Advance</a></li>
              <li className="breadcrumb-item active">404</li>
            </ol>
          </div>
        </div>
        <div className="container-fluid">
          
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="widget default-widget">
                <div className="error-content">
                  <h1 className="four-four-error">4<span>0</span>4</h1>
                    <h3><i className="fa fa-warning text-red"></i> Oops! Something went wrong.</h3>

                    <p>
                  We will work on fixing that right away.
                  Meanwhile, you may <Link to="/">return to dashboard</Link>.
                    </p>

                
                </div>
              </div>
            </div>
          </div>
          
        </div>  
      </div>
    );
  }
}

export default App;
