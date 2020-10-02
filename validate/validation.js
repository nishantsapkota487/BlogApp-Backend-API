const express = require('express');
const joi = require('@hapi/joi');

const registerValidate = (data) =>{
  const schema = joi.object({
    username:joi.string().required().max(64),
    email:joi.string().email().required().max(64),
    password:joi.string().required().max(64).min(6)
  })
  return schema.validate(data)
}

const loginValidate = (data) =>{
  const schema = joi.object({
    email:joi.string().email().required().max(64),
    password:joi.string().required().min(6).max(64)
  })
  return schema.validate(data)
}
module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;
