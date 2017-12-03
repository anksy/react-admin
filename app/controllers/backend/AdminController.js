'use strict';


const 
    crypto              = require('crypto'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    jwt                 = require('jsonwebtoken'),
    async               = require('async'),
    App                 = require(path.resolve("./app/controllers/AppController")),
    authy               = require(path.resolve('./app/config/libs/jwt')),
    Mailer              = require(path.resolve('./app/config/libs/mailer')),
    Admin               = require(path.resolve('./app/models/admin')),
    env                 = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    secret              = new Buffer(env.secret).toString('base64');

class AdminController {

    login(req, res){
        let obj = req.body;
        return new Promise((resolve, reject) => {
            Admin.findOne({
                username: obj.username
            }, {
                name: 1, username: 1, email: 1, password: 1, image : 1, status:1
            }, (err, user) => {
                if (err) reject(err);
                if (!user || !user.matchPassword(obj.password)) {
                        reject({type: "error", message: 'Invalid Username or Password.'});
                    } else if(!user.status){
                        reject({type: "error", message: 'Your account is not active yet.'});
                    } else {
                        user = { 
                            image: (user.image || null),
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            _id: user._id
                        };
                        let token = jwt.sign(user, secret, {expiresIn : "14 days"});
                        resolve({data : user, token: token, type: "success", message: "You've been authenticated successfully."});
                    }
            });
        })
        .then(result=>res.json(result))
        .catch(error=>res.status(412).json(error));
    }

    profile(req, res) {
        /*check for a valid token*/
        authy.verify(req, res, (user) => {
            /*fetch admin data from jwt token*/
            Admin.findOne({
                "_id": user._id
            }, {
                name: 1,
                email: 1,
                username:1,
                image:1,
                mobile : 1,
                bio :1
            }, (err, result) => {
                if(result) res.json({success:true,message:"Success",output:result}); else res.json({success:false,message:"User not exists."});
            });
        });
    }

    updateProfile(req, res){
        decodeJwt.run(req, secret, (id) => {
            Admin.findOneAndUpdate(
            {"_id": id},
            req.body,
            { runValidators: true, context: 'query' },
            function(err, result) {
                if(err){
                    /*if any error occured*/
                    var errs = [];
                    for(var e in err.errors){
                        errs.push(err.errors[e].message);
                    }
                    res.json({success:false,message:errs.join("\n")});
                    return;
                }

                if (result) {
                    res.json({
                        success: true,
                        message: "Your profile has been updated successfully."
                    });
                } else {
                    res.json({
                        success: false,
                        message: "some errors occurred "
                    });
                }
            });        
        });
    }

    changePassword(req, res){
        /*check if password supplied*/
        if (req.body.password && req.body.currentPassword) {
            Admin.findById(req.body._id, (err, user) => {
                /*If current password matches with saved one*/
                if (user && user.matchPassword(req.body.currentPassword)) {
                    Admin.update({
                        "_id": req.body._id
                    }, {
                        "$set" : {
                            "password": user.encryptPassword(req.body.password)
                        }
                    }, (err, update) => {
                        
                        if (update) {
                            res.json({
                                success: true,
                                message: "Your password has been changed successfully."
                            });   
                        }else{

                            res.json({
                                success: false,
                                message: "Some errors occurred"
                            }); 
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: "Your old password does not match."
                    });
                }
            });
        } else {
            res.json({
                success: false,
                msg: "Please provide password"
            });
        }
    }

    forgot(req, res){
        /*fetch request body*/
        let body =  req.body;
        /*find user from admin collection and send a reset password link*/
        Admin.findOneAndUpdate({
            "username": body.username
        },{
            resetKey : crypto.randomBytes(10).toString('hex')
        },{
            new : true
        }, (err, admin) => {
            if(admin){
                /*Send email to user*/
                admin.subject = "Reset Password Link";
                admin.from    = env.mail.from;
                admin.url     = env.admin_base_url;
                
                /*Send mail */
                Mailer.Email(admin.email,'forgot','admin/backend',{admin:admin,subject:"Forgot Your Password"});

                res.json({success:true,message:"We've sent an email to reset your password."});
            }else{
                res.json({success:false,message:"We've sent an email to reset your password."});
            }
        });
    };


    reset(req, res){
        /*fetch request body*/
        let body =  req.body;
        /*find user from admin collection and send a reset password link*/
        Admin.findOneAndUpdate({
            "resetKey": body.key
        },{
            resetKey : "",
            password : Admin.hashPassword(body.password)
        },{
            new : true
        }, (err, admin) => {
            if(admin){
                res.json({success:true,message:"Your password has been updated."});
            }else{
                res.json({success:false,message:"This link is not valid. Please request for a new reset password link."});
            }
        });
    };

    changeAvatar(req, res){
        /*fetch request body*/
        let body =  req.body;
        /*check for a valid token*/
       decodeJwt.run(req, secret, (data) => {
            /*find user from admin collection and send a reset password link*/
            console.log(req.files);
            if (Array.isArray(req.files)) {
                console.log(req.files[0]);
                let path = req.files[0].path.replace(env.image_destination+"/", "/"); 
                console.log(path);
                Admin.update({
                    "_id": data._id
                }, {
                    "$set": {
                        "image": path
                    }
                }, (err, result) => {
                    if (result.nModified === 1) {
                        res.json({
                            success: true,
                            message: "Avatar has been changed.",
                            output: path
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "Some error occurred."
                        });
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: "Please choose an image to upload as Avatar."
                });
            }
        });
    };

}

module.exports = AdminController;