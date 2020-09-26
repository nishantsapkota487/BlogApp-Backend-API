const express = require('express');
const postModel = require('../models/postmodel');
const router = express.Router();

router.post('/create', async (req, res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const post = new postModel({
    title:title,
    content:content,
    likes:0
  });
  try{
    const savedPost = await post.save()
    if (savedPost) {
      return res.status(200).json({
        mesage:savedPost
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

router.get('/posts', async (req, res) =>{
  try{
    const posts = await postModel.find({});
    if (posts) {
      return res.status(200).json({
        message:posts
      })
    }else{
      return res.status(404).json({
        message:'Something went wrong'
      })
    }
  }
  catch(err){
    return res.status(404).json({
      message:err
    })
  }
});

router.delete('/delete/:id', async (req, res)=>{
  const id = req.params.id;
  try{
    const post = await postModel.find({
      _id:id
    });
    const deletePost = post[0].delete();
    if (deletePost) {
      return res.status(200).json({
        message:'Successfully deleted'
      })
    }else{
      return res.status(404).json({
        message:'Something went wrong'
      })
    }
  }
  catch(err){
    return res.status(404).json({
      messag:err
    })
  }
});

// This is not complete
router.patch('/like/:id', async (req, res)=>{
  try{
    const id = req.params.id;
    const post = await postModel.findOne({
      _id:id
    });
    if (!post) {
      return res.json({
        message:'Something went wrongee'
      })
    }
    const updatedPost = await postModel.findOneAndUpdate(
      {_id:id},
      {$inc:
        {likes:1}},
      {returnNewDocument:true}
    )
    return res.status(200).json({
      message:updatedPost
    })
  }catch(err){
    return res.status(404).json({
      message:err
    })
  }
});
module.exports = router;
