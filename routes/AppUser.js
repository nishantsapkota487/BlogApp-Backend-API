const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { registerValidate, loginValidate } = require('../validate/validation');
const router = express.Router();

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
  const saltround = 15;
  const userExist = await userModel.findOne({
    email:email
  });
  if (userExist) {
    return res.json({
      message:'User Already exists'
    });
  }
  try{
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
