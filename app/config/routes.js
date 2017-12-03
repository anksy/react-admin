'use strict';

const path            = require('path'),
    fs              = require('fs'),
    expressJWT      = require('express-jwt'),
    env             = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    api_path        = env.API.site,
    admin_api_path  = env.API.admin;

class AppRouter {
    constructor(app, router){
        this.call = {
            frontend : {},
            backend : {}
        };
        this.frontend = {};
        this.backend = {};

        /**/
        this.api_path = api_path;
        this.admin_api_path = admin_api_path;

        /**/
        this.app = app;
        this.router = router;
    }

    loadAdminClasses(){
        fs.readdirSync(path.resolve('./app/controllers/backend')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in backend object*/
            this.backend[name] = require(path.resolve(`./app/controllers/backend/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['backend'][name] = new this.backend[name]();
        });
    }

    loadAppClasses(){
        fs.readdirSync(path.resolve('./app/controllers/frontend')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in frontend object*/
            this.frontend[name] = require(path.resolve(`./app/controllers/frontend/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['frontend'][name] = new this.frontend[name]();
        });
    }

    unlessRoutes(){
        this.router.use(expressJWT({
            secret: new Buffer(env.secret).toString('base64'),
        }).unless({
            path: [
                this.admin_api_path+'login-admin',

                this.api_path+'login-app',
                this.api_path+'send-otp',
                this.api_path+'register',
                this.api_path+'forgot-password',
                this.api_path+'reset-password'
            ]
        }));
    }

    loadAdminRoutes(){
        this.router.post('/login-admin', this.call['backend']['AdminController'].login);
        this.router.post('/my-profile', this.call['backend']['AdminController'].profile);
    }

    loadAppRoutes(){
        this.router.get('/send-otp', this.call['frontend']['UserController'].sendOTP);
        this.router.post('/register', this.call['frontend']['UserController'].register);
        this.router.post('/login-app', this.call['frontend']['UserController'].login);
        this.router.post('/forgot-password', this.call['frontend']['UserController'].forgot);
        this.router.put('/reset-password', this.call['frontend']['UserController'].resetPassword);
    }

    init(){
        this.loadAdminClasses();
        this.loadAppClasses();
        this.unlessRoutes();
        this.loadAdminRoutes();
        this.loadAppRoutes();

        return this.router;
    }
}

module.exports = AppRouter;