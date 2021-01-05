// AUTH MIDDLEWARE GO HERE

const jwt = require('jsonwebtoken');
const express = require('express');

// this allows us to verify token received
// from the backend
const verify = async (req, res, next) => {
  const token = req.header('auth_token');
  if (!token) {
    return res.status(402).json({
      message:'Access denied'
    });
  }
  try{
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next()
  }catch(err){
    console.log(err);
    return res.status(400).json({
      message:err
    });
  }
}

module.exports = verify;
