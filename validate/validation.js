const express = require('express');
const joi = require('@hapi/joi');

// this function validates the values
// when users registers email, username and
// password
const registerValidate = (data) =>{
  const schema = joi.object({
    username:joi.string().required().max(64),
    email:joi.string().email().required().max(64),
    password:joi.string().required().max(64).min(6)
  })
  return schema.validate(data)
}

// this function validates the values when
// users login
const loginValidate = (data) =>{
  const schema = joi.object({
    email:joi.string().email().required().max(64),
    password:joi.string().required().min(6).max(64)
  })
  return schema.validate(data)
}
module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;
