const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/post');
const userSchema = require('./models/User');
const app = express();
dotenv.config();
app.listen(process.env.PORT, (req, res)=>{
  console.log("listening on port", process.env.PORT);
})
mongoose.connect(process.env.DB_CONNECT,
   { useUnifiedTopology: true,
     useNewUrlParser: true,
    },
   ()=>{
  console.log('DB Connected');
});
app.use('/api', router);
