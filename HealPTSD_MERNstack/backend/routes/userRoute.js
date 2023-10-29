const express = require('express');
const user_route = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('../config/config');

user_route.use(session({secret:config.sessionSecret, 
    resave: false,             // Add this line to specify resave option.
    saveUninitialized: true }));

const auth = require("../middleware/auth");

user_route.set('view engine','ejs');
user_route.set('views','./views/users');

const userController = require('../controllers/userController');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.post('/register', userController.insertUser);

user_route.post('/verify', userController.verifyEmail);

user_route.post('/login', userController.verifyLogin);

user_route.get('/home', auth.isLogin, userController.loadHome);

user_route.get('/logout', auth.isLogin, userController.userLogout);

user_route.get('/forget', auth.isLogout, userController.loadForget);

user_route.post('/forget', userController.forgetVerify);

user_route.get('/forget-password', auth.isLogout, userController.loadForgetPassword);

user_route.post('/forget-password', userController.resetPassword);

user_route.get('/verification', userController.loadVerification);

user_route.post('/verification', userController.sendVerificationLink);

user_route.get('/edit', auth.isLogin, userController.loadEdit);

user_route.post('/edit', auth.isLogin, userController.updateProfile);

module.exports = user_route;