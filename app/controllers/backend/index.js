'use strict';

const  mongoose 		= require('mongoose'),
	path				= require('path'),
	crypto				= require('crypto'),
	Admin         		= require(path.resolve('./app/models/admin'));


class Index {
	checkAdminAccount(){
		Admin.findOne({
		    type: 1,
		}, (err, result) => {
		    if (!result) {
		        var admin = {
		        	username : "admin",
		            email: 'user@flexsin.com',
		            password: '123456',
		            type: 1,
		            auth: crypto.randomBytes(10).toString('hex')
		        };
		        var user = new Admin(admin);
		        user.save((err, result) => {
		        	/*User Create*/
		        });
		    }
		});
	}
}

module.exports = Index;