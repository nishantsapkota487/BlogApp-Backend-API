const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/post');
const app = express()
dotenv.config()
app.listen(process.env.PORT, (req, res)=>{
  console.log("listening on port", process.env.PORT);
})
app.use('/api', router);
