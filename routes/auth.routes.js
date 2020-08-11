const express = require('express');
const router = express.Router();
const User=require('../models/User.model')

// Require user model

// Add bcrypt to encrypt passwords
const bcrypt = require('bcryptjs')
const saltRounds=10;
  
// Add passport

const ensureLogin = require('connect-ensure-login');

router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('passport/private', { user: req.user });
});

router.get('/signup',(req,res,next)=>{
  res.render('auth/signup');
})

router.get('/login', (req, res, next) => {
  res.render('auth/login');
})

router.post('/signup', (req, res, next) => {
  const {username, password} = req.body;
if (username==="" || password===""){
  res.render('auth/signup',{errorMessage: "Username or Password have no value"})
}
User.findOne({"username":username})
.then(user=>{
  if(user){  res.render('auth/signup',{errorMessage: "Username already exist"}) }
  else {
    const salt=bcrypt.genSaltSync(saltRounds);
    const hashPass=bcrypt.hashSync(password,salt);
     
    User.create({username, "password":hashPass})
    .then(()=>{
      console.log("User created successfully");
      res.render("auth/login");
    }).catch(err=>"Error happened",error)



  }
})
  // const hashPass = bcrypt.





})

module.exports = router;
