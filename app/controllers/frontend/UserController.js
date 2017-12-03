const path = require("path"),
	  jwt  = require("jsonwebtoken"),
	  _    = require("lodash"),
	  async= require("async"),

	  /**/
	  env    = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
	  error  = require(path.resolve(`./app/config/libs/error`)),
	  mailer = require(path.resolve(`./app/config/libs/mailer`)),
	  _moment= require(path.resolve(`./app/config/libs/date`)),


	  App  = require(path.resolve("./app/controllers/AppController")),


	  User = require(path.resolve("./app/models/User"));
	  OTP  = require(path.resolve("./app/models/OTP"));


class UserController extends App {
	constructor(){
		super();

		/**/
		this.login = this.login.bind(this);
		this.sendOTP = this.sendOTP.bind(this);
		this.forgot = this.forgot.bind(this);
	}

	/*Private function - check for a valid email address*/
	__if_valid_email(email){
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


	/*Private function - generates a random string*/
	__random(len){
	  let string = "12346790";
	  let rand = string.split('');
	  let shuffle = _.shuffle(rand);
	  let num = _.slice(shuffle,0,len);
	  return num.join("");
	}

	/**
	 * login - authenticate user against passed credentials
	 */
	login(req, res){
		let obj = req.body, match = [];
		/*Build conditions for User Login*/
		if(this.__if_valid_email(obj.username)){
			match.push({isEmailActive : true, email : obj.username});
		}else{
			match.push({"misc.socialId" : obj.username});
		}

		User.findOne({$and:match},
			{email:1,name:1,auth:1,status:1,password:1},
			(err, user) => {
				/*if err*/
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});
				if(user){
					/*if user found*/
					if(!user.status){
						/*if user account is not active then send alert*/
						return res.json({type:"error",message:error.oops(),errors:["Your account has been blocked by administator."]});
					}else if(user.password !== User.getPassword(obj.password,user.auth)){
						/*if password not match*/
						return res.json({type:"error",message:error.oops(),errors:["Invalid Username or Password."]});
					}else{
						/*if user is authenticated then send success*/
						let _user = {_id:user._id, name:user.name, email:user.email};
						let token = jwt.sign(_user, env.secret, {expiresIn: '14 days'});
						return res.json({type:"success",message:"Your credentials have been verified.",data:_user,token:token});
					}
				}else{
					/*if user not found*/
					return res.json({type:"error",message:error.oops(),errors:["We couldn't found your account."]});
				}
			}
		);		
	}

	register(req, res){
		let obj = req.body;

		OTP.findOne({
			email : (obj.email || null),
			action : "EmailVerification",
		},{otp:1},(err, result) => {
			if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});
			if(result) {
				/*setup extra fields*/
				/*user will come through verify state so verify */
				if(result.otp===obj.otp){
					obj.isEmailActive = true;
					let newUser = User(obj);
					newUser.save()
					.then(result=>{
						let token = jwt.sign({_id:result._id, firstname:result.firstname, lastname:result.lastname, birthdate:result.birthdate, email:result.email}, env.secret, {expiresIn:"14m"});
						return res.json({type:"success",message:"You've been registered successfully.",data:result,token:token});
					})
					.catch(err=>res.json({type:"error",message:error.oops(),errors:error.pull(err)}));
				}else{
					return res.json({type:"error",message:error.oops(),errors:["You've entered incorrect OTP."]});
				}	

			}else{
				return res.json({type:"error",message:error.oops(),errors:["We couldn't validate your account."]});
			}
		});
	}

	/*
	 * send otp - send an otp to user
	 * for various purpose	
	 */
	sendOTP(req, res){
		let obj = req.query, hash = this.__random(6);

		User.count({
			email : (obj.username || null),
			isEmailActive : true
		}, (err, count) => {
			if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

			if(count<1){
				OTP.findOneAndUpdate({
					email : obj.username,
				},{
					otp : hash
				},{
					new : true,
					upsert : true
				},(err, result) => {
					if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

					mailer.Email(obj.username,'otp','app/views/',{body:{otp:hash},subject:"Verify Your Email Address - "+env.constants.app});
					return res.json({type:"success",message:"OTP has been sent to your email address."});
				});
			}else{
				return res.json({type:"error",message:error.oops(),errors:["This email address is already exists."]});
			}
		});
	}

	/*forgot - generate a reset password code for user*/
	forgot(req, res){
		let obj = req.body, hash = this.__random(6);

		async.waterfall([
			(_callback) => {
				/*check for user to generate a password*/
				User.findOne({
					email : (obj.email || null)
				},{
					email : 1
				},(err, user) => {
					/*if err then reject*/
					if(err) _callback(err);

					if(user){
						/*if user found then proceed to next stage*/
						_callback(null, user);
					}else{
						/*if user not found*/
						_callback("We couldn't found your account.");
					}
				});
			},
			(user, _callback) => {
				/*lets register an OTP and set validity of code*/
				OTP.findOneAndUpdate({
					email : obj.email
				},{
					otp : hash,
					action : "ResetPassword",
					validity:_moment.futureDate(new Date(),"x",120,"m")
				},{
					new : true,
					upsert : true
				}, (err, newotp) => {
					/*if err then reject*/
					if(err) _callback(err);

					if(newotp){
						/*if new OTP has been registered for 2 hrs*/
						user.newotp = newotp.otp;
						_callback(null, user);
					}else{
						/*if otp not updated*/
						_callback("We couldn't found your account.");
					}
				});
			}
		], (err, result) => {
			if(err) res.status(412).json({type : "error", message:error.oops(), errors: error.pull(err)});

			/*send mail*/
			mailer.Email(result.email,'forgot','app/views/',{body:result,subject:"Reset Your Password - "+env.constants.app});
			return res.json({type:"success",message:"An OTP has been sent to your email address to reset your passwaord."});
		});
	}

	/**
	 * resetPassword
	 * 
	 * validate and reset user password
	 */
	resetPassword(req, res){
		let obj = req.body;

		async.waterfall([
			(_callback) => {
				/*Verify OTP against email*/
				OTP.findOne({
					otp : obj.otp,
					action : "ResetPassword"
				},(err, result) => {
					/*if err*/
					if(err) _callback(err);

					if(result){
						/*OTP if updated*/
						if(result.validity >= _moment.timestamp()){
							/*if otp is accessed within timeline of 2hrs*/
							_callback(null, result);
							OTP.setNull(obj);
							console.log("est----");
						}else{
							_callback("This OTP has been expired.");
						}
					}else{
						/*if not found*/
						_callback("This OTP seems to be invalid.");
					}
				})
			},
			(otp, _callback) => {
				/*Update User's Password*/
				User.findOne({
					email : otp.email 
				},{
					auth:1
				},(err, user) => {
					if(err) _callback(err);

					if(user){
						/*if user found*/
						_callback(null, user);
					}else{
						/*if not found*/
						_callback("We couldn't confirm your identity. Please try again.");
					}
				});
			}
		], (err, result) => {
			if(err) res.status(412).json({type:"error",message:error.oops(),errors:error.pull(err)});

			if(result){
				/*if result found, update user password*/
				User.updatePassword(result._id, result.auth, obj.password);
				res.json({type:"success",message:"Your password has been changed."});
			}
		});
	}

	/**
	 * checkSocialStatus
	 * @return {[type]}     [description]
	 */
	checkSocialStatus(req, res) {
		
	}

}

module.exports = UserController;