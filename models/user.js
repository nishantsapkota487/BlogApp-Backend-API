// USER MODEL WILL BE HERE
const express = require('express');
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userModel = schema({
  username:{
    type:String,
    required:true,
    min:6,
    max:56,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
    min:5,
    max:56
  }
});

module.exports = mongoose.model('User', userModel);
