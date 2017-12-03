import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Session from '../../services/session';
import { ToastContainer, toast } from 'react-toastify';

class Login extends Component {
  constructor(props){
    super(props);

    /*bind <this> with class methods*/
    this.loginnow = this.loginnow.bind(this);

    /**/
    this.state = {
      status : undefined
    };
  }
  render() {

    const {handleSubmit} = this.props;
    return (
        <div className="container noPad">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="login-panel panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Please Sign In</h3>
                </div>
                <div className="panel-body">
                  
                  <Form horizontal onSubmit={handleSubmit(this.loginnow)}>
                      {/*<Alert bsStyle="danger">{this.state.status}</Alert>*/}

                      <Field name="username" fieldName='username' type="text" placeholder='Username' component={Login.renderField}/>
                      <Field name="password" fieldName='password' type='password' placeholder='Password' component={Login.renderField}/>

                      <FormGroup>
                          <Button type="submit" className='btn btn-login' disabled={this.props.invalid || this.props.submitting}>Login</Button>
                      </FormGroup>
                  </Form>

                </div>
              </div>
            </div>
          </div>
          <ToastContainer 
          position="top-right"
          type="error"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        </div>
    );
  }


  loginnow(data){
    
      this.props.dispatch({
        type : "Admin-login",
        data: data,
        success : (r) => {
          /*set user session in cookie*/
          Session.setSession("token", r.token);
          Session.setSession("user", r.data);

          this.props.dispatch(push("/"));
        },
        error : (e) => toast(e.message)
      });
  }

  static renderField(props){
      return(
        <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>
            <FormControl 
            {...props.input}
            name={props.fieldName}
            placeholder={props.placeholder}
            type={props.type}/>
            <HelpBlock>
              {props.meta.touched && props.meta.error ? props.meta.error : null}
            </HelpBlock>
        </FormGroup>
      );
  }
}

//decorate form component

export default Login = reduxForm({
  form : "login",
  validate : function(values){
    const errors = {};
    if(!values.username) errors.username = "Username is required";
    if(!values.password) errors.password = "Password is required";
    return errors;
  }
})(Login);
