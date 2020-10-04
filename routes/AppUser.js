const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const verifyToken = require('../middlewares/auth');
const { registerValidate, loginValidate } = require('../validate/validation');
const router = express.Router();

// this endpoint allows the user to register
// themseleves in the app
router.post('/register', async (req, res) =>{
  const { error }  = registerValidate(req.body);
  if (error) {
    return res.status(400).json({
      message:'Registration failed'
    });
  }
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const saltround = Number(process.env.SALT_ROUND);
  const userExist = await userModel.findOne({
    email:email
  });
  if (userExist) {
    return res.json({
      message:'User Already exists'
    });
  }
  try{
    // this is the process to hash the password
    // once the user sets the password
    const salt = await bcrypt.genSalt(saltround);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
  }catch(err){
    console.log(err);
    return res.json({
      message:'Something went wrong'
    });
  }
  const user = new userModel({
    username:username,
    email:email,
    password:password
  })
  try{
    const savedUser = await user.save()
    if (savedUser) {
      return res.status(200).json({
        message:savedUser
      });
    }
    return res.json({
      message:'Something went wrong'
    })
  }catch(err){
    return res.json({
      message:'Something went wrong'
    });
  }
});

// this endpoint allows the user to login after
// they register in the blogapp
router.post('/login',  async (req, res) =>{
  const email = req.body.email;
  const password = req.body.password;
  try{
    const user = await userModel.findOne({
      email:email
    });
    console.log(user);
    if (!user) {
      return res.json({
        message:'User does not exist'
      });
    }
    // this allows the code to check whether the user has entered
    // correct password or not
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.status(400).json({
        message:'Enter correct credential'
      })
    }
    // this allows us to generate the
    // token and add id of the user inside it and attach
    // it in the header
    const token = jwt.sign(
      {
      _id:user._id
      },
      process.env.SECRET
    );
    return res.header('auth-token', token).json({
      message:token
    });
  }catch(err){
    return res.json({
      message:'Something went wrong'
    });
  }
});

// this endpoint allows the admin to get
// all the users who are using the blogapp
router.get('/alluser', async (req, res) =>{
  const users = await userModel.find({});
  if (!users) {
    return res.status(400).json({
      message:'Something went wrong'
    });
  }
  return res.status(200).json({
    message:users
  });
});

module.exports = router;
