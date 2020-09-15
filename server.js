const express = require('express');
const dotenv = require('dotenv');
const app = express()
dotenv.config()
app.listen(process.env.PORT, (req, res)=>{
  console.log("listening on port", process.env.PORT);
})
app.get('/', (req, res)=>{
  res.send('Hello world!!')
});
