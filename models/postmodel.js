// POSTS MODEL WILL BE HERE
const express = require('express');
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const posts = schema({
  title:{
    type:String
  },
  content:{
    type:String
  },
  comment:[
    {
      type:Schema.Types.ObjectId,
      ref:'Comments'
    }
  ],
  createdTime:{
    type:Date,
    default:Data.now
  },
  creator:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

module.exports = mongoose.model('Posts', posts);
