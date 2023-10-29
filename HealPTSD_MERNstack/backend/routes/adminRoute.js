const express = require('express');

const admin_route = express();
const config = require('../config/config');

const session = require('express-session');
admin_route.use(session({secret:config.sessionSecret, 
    resave: false,             // Add this line to specify resave option.
    saveUninitialized: true }));

const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.unsubscribe(bodyParser.urlencoded({extended:true}));

admin_route.set('view engine', "ejs");
admin_route.set('views', './views/admin');

const adminController = require('../controllers/adminController')
admin_route.get('/', adminController.loadLogin);

admin_route.post('/', adminController.verifyLogin);

admin_route.get('/admin-name', adminController.loadDashboard);

admin_route.get('/logout', adminController.logout);

admin_route.get('/dashboard', adminController.adminDashboard);

admin_route.get('*', function(req, res){
    res.redirect('/api/admin')
});

module.exports = admin_route;

