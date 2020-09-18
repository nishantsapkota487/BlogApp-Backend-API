// COMMENT MODEL GOES HERE
const express = require('express');
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const commments = schema({
  comment:{
    type:String,
    max:128,
    required:false
  }
});

module.exports = mongoose.model('Comments', comments);
