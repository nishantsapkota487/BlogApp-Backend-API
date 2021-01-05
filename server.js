const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const postRouter = require('./routes/post');
const userRouter = require('./routes/AppUser');
const userSchema = require('./models/user');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
  origin:process.env.ORIGIN
}));
app.get('/test', (req, res)=>{
  res.json({
    message:"this is test"
  })
})

app.listen(process.env.PORT, (req, res)=>{
  console.log("listening on port", process.env.PORT);
});

mongoose.connect(process.env.DB_CONNECT,
   { useUnifiedTopology: true,
     useNewUrlParser: true,
    },
   ()=>{
  console.log('DB Connected');
});

// this api endpoint is for all
// the blogs
app.use('/api/blogs', postRouter);


// this api endpoint is for all
// the usrs
app.use('/api/user', userRouter);
