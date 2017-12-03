import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
import {reduxForm, Field} from 'redux-form';

class Profile extends Component{

	componentWillMount(){
		this.props.dispatch({
			type: "Admin-profile",
			success: (r) => {
				console.log(r);
			},
			error : (e) => {

			}
		});
	}
	render(){
		const {handleSubmit} = this.props;
		return(
			<div id="page-wrapper">
				<div className="row page-titles">
					<div className="col-md-5 align-self-center">
						<h3 className="text-themecolor">My Profile</h3>
					</div>
					<div className="col-md-7 align-self-center">
						<ol className="breadcrumb">
							<li className="breadcrumb-item"><Link to="/">Home</Link></li>
							<li className="breadcrumb-item active">Profile Page</li>
						</ol>
					</div>
				</div>
				<div className="container-fluid">
					
					<div className="row">
						<div className="col-md-4">
						  
						  <div className="box box-primary">
							<div className="box-body box-profile">
							  <img className="profile-user-img img-responsive img-circle" src="../../dist/img/avater-1.jpg" alt="User profile picture" />

							  <h3 className="profile-username text-center">Nina Mcintire</h3>

							  <p className="text-muted text-center">Software Engineer</p>
							  <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
							  <ul className="profile-group">
								<li>
								  <b>1,322</b>Followers
								</li>
								<li>
								  <b>543</b> Following
								</li>
								<li>
								  <b>13,287</b>Friends
								</li>
							  </ul>
							</div>
							
						  </div>
	  
						</div>
						
						<div className="col-md-8">
						  <div className="nav-tabs-custom">
							

							<Form horizontal onSubmit={handleSubmit(this.updateProfile)} className='profileForm'>

		                      <Field name="name" fieldName='name' type="text" placeholder='Name' component={Profile.renderField}/>
		                      <Field name="username" fieldName='username' type='text' placeholder='Username' component={Profile.renderField}/>
		                      <Field name="email" fieldName='email' type='text' placeholder='Email' component={Profile.renderField}/>
		                      <Field name="password" fieldName='password' type='password' placeholder='Password' component={Profile.renderField}/>

		                      <FormGroup>
		                      	<div className="col-sm-offset-2 col-sm-10">
		                          <Button type="submit" className='btn btn-danger' disabled={this.props.invalid || this.props.submitting}>Update</Button>
		                        </div>
		                      </FormGroup>
		                  </Form>

						  </div>
						  
						</div>
						
					</div>
					
				</div>	
			</div>
		);
	}

	updateProfile(){

	}

	static renderField(props){
      return(

      	

        <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>

        	<label htmlFor={props.fieldName} className="col-sm-2 control-label">{props.placeholder}</label>
        	<div className="col-sm-10">
	            <FormControl 
	            {...props.input}
	            name={props.fieldName}
	            placeholder={props.placeholder}
	            type={props.type}/>
	            <HelpBlock>
	              {props.meta.touched && props.meta.error ? props.meta.error : null}
	            </HelpBlock>
            </div>
        </FormGroup>
      );
  	}
}

export default reduxForm({
  form : "my-profile",
  validate : function(values){
    const errors = {};
    if(!values.name) errors.name = "Name is required";
    if(!values.username) errors.username = "Username is required";
    if(!values.email) errors.email = "Email is required";
    if(!values.password) errors.password = "Password is required";
    return errors;
  }
})(Profile);
