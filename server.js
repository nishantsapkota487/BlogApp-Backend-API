const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRouter = require('./routes/post');
const userRouter = require('./routes/AppUser');
const userSchema = require('./models/user');

const app = express();
dotenv.config();
app.use(express.json());

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

app.use('/api/blogs', postRouter);
app.use('/api/user', userRouter);
