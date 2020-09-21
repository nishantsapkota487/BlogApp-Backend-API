const express = require('express');
const postModel = require('../models/postmodel');
const router = express.Router();
// This endpoint is just for api testing
router.get('/', (req, res)=>{
  res.json({
    message:'Received'
  });
})
router.post('/create', async (req, res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const post = new postModel({
    title:title,
    content:content,
  });
  try{
    const savedPost = await post.save()
    if (savedPost) {
      return res.status(200).json({
        post:savedPost
      })
    }
  }
  catch(err){
    if (err) {
      console.log(err);
      return res.status(404).json({
        message:'Something went wrong which was'
      })
    }
  }
});
module.exports = router;
