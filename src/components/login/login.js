import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, HelpBlock, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import Http from '../../services/http';

class Login extends Component {
  constructor(props){
    super(props);

    this.loginnow = this.loginnow.bind(this);
  }
  render() {
    return (
        <div className="container noPad">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="login-panel panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Please Sign In</h3>
                </div>
                <div className="panel-body">
                  
                  <Form horizontal>
                      <Field name="username" fieldName='username' type="text" placeholder='Username' component={Login.renderField}/>
                      <Field name="password" fieldName='password' type='password' placeholder='Password' component={Login.renderField}/>

                      <FormGroup>
                          <Button className='btn btn-login' disabled={this.props.invalid || this.props.submitting} onClick={this.loginnow}>Login</Button>
                      </FormGroup>
                  </Form>

                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  loginnow(){
      Http.Get("http://158.85.76.204:8019/api/settings")
      .then(resp => console.log(resp));
  }

  static renderField(props){
      return(
        <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>
          <Col sm={12}>
            <FormControl 
            name={props.fieldName}
            placeholder={props.placeholder}
            type={props.type}/>
            

            <HelpBlock>
              {props.meta.touched && props.meta.error ? props.meta.error : null}
            </HelpBlock>
          </Col>
        </FormGroup>
      );
  }
}

//decorate form component

export default Login = reduxForm({
  form : "login",
  validate : function(values){
    const errors = {};
    if(!values.username) {
      errors.username = "Username is required";
    }
    return errors;
  }
})(Login);
