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
      type:schema.Types.ObjectId,
      ref:'Comments',
      required:false
    }
  ],
  createdTime:{
    type:Date,
    default:Date.now
  },
  creator:{
    type:schema.Types.ObjectId,
    required:true,
  },
  likes:{
    type:Number,
  },
  dislikes:{
    type:Number
  }
});

module.exports = mongoose.model('Posts', posts);
