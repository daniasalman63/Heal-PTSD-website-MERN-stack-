const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');

const config = require('../config/config')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message)
    }

}

//for sending mail
const sendVerifyMail = async(name, email, user_id) => {
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS: true,
            auth:{
                user:config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from:config.emailUser,
            to:email,
            subject:'Verify your heal PTSD email',
            html: '<p>Hi '+name+',please click here to <a href="http://localhost:3000/verify?id='+user_id+'"> Verify </a> your mail.</p>'
        }
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Email has been sent:- ",info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const verifyEmail = async (req, res) => {
    try {
      // Update the user's verification status in the database
      await User.updateOne({ _id: req.query.id }, { $set: { isVerified: 1 } });
  
      // Send a JSON response to indicate successful verification
      res.json({ message: 'Email verification successful' });
    } catch (error) {
      console.log(error.message);
      // Send an error response
      res.status(500).json({ error: 'An error occurred during verification' });
    }
  };

//for reset password
const sendResetPasswordMail = async(name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS: true,
            auth:{
                user:config.emailUser,
                pass: config.emailPassword
            }
        });
        const mailOptions = {
            from:config.emailUser,
            to:email,
            subject:'Reset your heal PTSD password',
            html: '<p>Hi '+name+',please click here to <a href="http://localhost:3000/forget-password?token='+token+'"> Reset </a> your password.</p>'
        }
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Email has been sent:- ",info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const insertUser = async (req, res) => {
    try {
        const email = req.body.email;

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            // An account with this email already exists
            return res.status(400).json({ message: 'An account with this email already exists.' });
        } else {
            // Email is not in use, proceed with user creation
            const sPassword = await securePassword(req.body.password);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email,
                password: sPassword,
                mentalHealthHistory: req.body.mentalHealthHistory,
                age: req.body.age,
                gender: req.body.gender,
                therapyOption: req.body.therapyOption,
                contact: req.body.contact,
                isAdmin: 0
            });

            const userData = await user.save();

            if (userData) {
                sendVerifyMail(req.body.firstName, email, userData._id);
                return res.status(200).json({ message: 'You have created an account successfully! Please verify your email.' });
            } else {
                return res.status(500).json({ message: 'Unable to create an account!' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
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
          if (userData.isVerified === 0) {
            res.json({ message: "Please verify your email!" });
          } else {
            // Set the user's session
            req.session.user_id = userData._id;
            const token = jwt.sign({ email: userData._id, username: userData.firstName }, config.sessionSecret, {
                expiresIn: '1h', // Token expiration time (adjust as needed)
              });
            
            // Return the correct response property for redirection
            res.json({ redirectTo: "/home", token});
          }
        } else {
          res.status(401).json({ message: "Email or password is incorrect" });
        }
      } else {
        res.status(401).json({ message: "Email or password is incorrect" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  };
  
  

const loadHome = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id });
        res.json({ user: userData });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
};

const userLogout = async (req, res) => {
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

//forgot password code
const loadForget = async (req, res) => {
    try {
        res.render('forget');
    } catch (error) {
        console.log(error.message);
    }
}

const forgetVerify = async (req, res) => {
    try {
      const email = req.body.email;
      const userData = await User.findOne({ email: email });
  
      if (userData) {
        if (userData.isVerified === 0) {
          return res.json({ message: 'Please verify your email!' });
        } else {
          const randomString = randomstring.generate(); // Implement this function
          userData.token = randomString;
          await userData.save();
          sendResetPasswordMail(userData.firstName, userData.email, randomString); // Implement this function
          return res.json({ message: 'Please check your email to reset your password.' });
        }
      } else {
        return res.status(404).json({ message: 'Email does not exist!' });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'An error occurred during password reset' });
    }
  };

const loadForgetPassword = async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await User.findOne({ token: token });
  
      if (tokenData) {
        return res.json({ user_id: tokenData._id });
      } else {
        return res.status(404).json({ error: 'Token is invalid' });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'An error occurred while loading the password reset page' });
    }
  };

  const resetPassword = async (req, res) => {
    try {
      const password = req.body.password;
      const user_id = req.body.user_id;
  
      const secure_password = await securePassword(password); // Implement this function
      const userData = await User.findByIdAndUpdate(user_id, { password: secure_password, token: '' });
  
      return res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'An error occurred during password reset' });
    }
  };

//for verification, send mail link
const loadVerification = async (req, res) => {
    try {
        res.render('verification');
    } catch (error) {
        console.log(error.message);
    }
}

const sendVerificationLink = async (req, res) => {
    try {
        const email = req.body.email;
        let userData = await User.findOne({email: email});
        if(userData){
            sendVerifyMail(userData.firstName, userData.email, userData._id);
            res.render('verification',{message:"Verification email sent!"})
        }
        else{
            res.render('verification', {message:"Invalid Email"})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadEdit = async (req, res) => {
    try {
        const id = req.query.id;
        const userData = await User.findById({_id:id});
        if(userData){
            res.render('edit', {user: userData});
        }
        else{
            res.redirect('/home')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateProfile = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate({_id:req.body.user_id},{$set:{firstName:req.body
        .firstName, lastName:req.body.lastName, email:req.body.email, contact:req.body.contact}})
        res.redirect('/home');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    insertUser,
    verifyEmail,
    verifyLogin,
    loadHome,
    userLogout,
    loadForget,
    forgetVerify,
    sendResetPasswordMail,
    loadForgetPassword,
    resetPassword,
    loadVerification,
    sendVerificationLink,
    loadEdit,
    updateProfile,
}