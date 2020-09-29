const express = require('express');
const mongoose = require('mongoose');
const postModel = require('../models/postmodel');
const commentModel = require('../models/comment');
const router = express.Router();

mongoose.set('useFindAndModify', false);

router.post('/create', async (req, res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const post = new postModel({
    title:title,
    content:content,
    likes:0,
    dislikes:0
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

router.patch('/like/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const likedPost = await postModel.findOneAndUpdate(
      {_id:id},
      {$inc:{
        likes:1
      }},
      {returnNewDocument:true}
    );
    if (likedPost) {
      return res.status(200).json({
        message:likedPost
      });
    }
    return res.status(200).json({
      message:'Something went wrong'
    });
  }catch(err){
    return res.status(200).json({
      message:'Something went wrong'
    });
  }
});

router.patch('/dislike/:id', async (req, res) =>{
  try{
    const id = req.params.id;
    const dislikedPost = await postModel.findOneAndUpdate(
      {_id:id},
      {$inc:
        {dislikes:1}},
      {returnNewDocument:true}
    )
    if (dislikedPost) {
      return res.status(200).json({
        message:dislikedPost
      })
    }
    return res.status(400).json({
      message:'something went wrong'
    })
  }catch(err){
    console.log(err);
    return res.status(400).json({
      message:'Something went wrong'
    })
  }
});

router.post('/comment/:postid', async (req, res) =>{
  try{
    const postId = req.params.postid;
    const comment = new commentModel({
      comment:req.body.comment
    });
    const savedComment = await comment.save();
    if (!savedComment) {
      return res.status(400).json({
        message:'Something went wrong'
      })
    }
    const post = await postModel.findOneAndUpdate(
      {_id:postId},
      {$push:
        {comment:comment}}
    );
    if (!post) {
      return res.status(400).json({
        message: 'Something went wrong'
      });
    }
    return res.status(200).json({
      message:post
    });
  }catch(err){
    return res.status(400).json({
      message:err
    });
  }
});

module.exports = router;
