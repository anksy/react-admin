import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
        <div id="page-wrapper">
            <div className="row page-titles">
              <div className="col-md-5 align-self-center">
                <h3 className="text-themecolor">Dashboard 2</h3>
              </div>
              <div className="col-md-7 align-self-center">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard 2</li>
                </ol>
              </div>
            </div>
            <div className="container-fluid">
              
              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <div className="widget gradient-widget">
                    <div className="widget-caption gradient-danger">
                      <div className="gradient-icon gr-icon-danger">
                        <i className="icon icon-profile-male"></i>
                      </div>
                      <div className="gradient-detail">
                        <div className="widget-detail">
                          <h3>372</h3>
                          <span>New & Latest Users</span>
                        </div>
                        <a href="" className="gr-btn" title="View More">More Info</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="widget gradient-widget">
                    <div className="widget-caption gradient-info">
                      <div className="gradient-icon gr-icon-info">
                        <i className="icon icon-happy"></i>
                      </div>
                      <div className="gradient-detail">
                        <div className="widget-detail">
                          <h3>512</h3>
                          <span>Happy Customer</span>
                        </div>
                        <a href="" className="gr-btn" title="View More">More Info</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="widget gradient-widget">
                    <div className="widget-caption gradient-purple">
                      <div className="gradient-icon gr-icon-purple">
                        <i className="icon icon-basket"></i>
                      </div>
                      <div className="gradient-detail">
                        <div className="widget-detail">
                          <h3>740</h3>
                          <span>Total Sales</span>
                        </div>
                        <a href="" className="gr-btn" title="View More">More Info</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="widget gradient-widget">
                    <div className="widget-caption gradient-success">
                      <div className="gradient-icon gr-icon-success">
                        <i className="icon icon-trophy"></i>
                      </div>
                      <div className="gradient-detail">
                        <div className="widget-detail">
                          <h3>480</h3>
                          <span>World Award</span>
                        </div>
                        <a href="" className="gr-btn" title="View More">More Info</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>  
          </div>
    );
  }
}

export default Dashboard;
