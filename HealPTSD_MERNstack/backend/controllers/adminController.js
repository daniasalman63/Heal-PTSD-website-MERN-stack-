const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const bcrypt = require('bcrypt');

const loadLogin = async(req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);

            if (passwordMatch) {
                if (userData.isAdmin === 0) {
                    res.status(401).json({ message: "Email or password is incorrect" });
                } else {
                    req.session.user_id = userData._id;

                    const token = jwt.sign({ email: userData._id, username: userData.firstName }, config.sessionSecret, {
                        expiresIn: '1h', // Token expiration time (adjust as needed)
                      });
                    res.json({ redirectTo: "/api/admin/home" });
                }
            } else {
                res.status(401).json({ message: "Email or password is incorrect" });
            }
        } else {
            res.status(401).json({ message: "Email or password is incorrect" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


const loadDashboard = async(req,res)=>{
    try {
        const userData = await User.findById(req.session.user_id);
        res.json({ admin: userData });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const logout = async (req, res) => {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err.message);
            res.status(500).json({ message: 'An error occurred during logout' });
          } else {
            res.json({ message: 'Logout successful' });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'An error occurred during logout' });
    }
  };

const adminDashboard = async (req, res) => {
    try {
        const adminData = await User.findById(req.session.user_id);
        const usersData = await User.find({ isAdmin: 0 });
        res.status(200).json({ users: usersData, admin:adminData });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
}