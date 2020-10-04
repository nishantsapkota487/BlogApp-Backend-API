const express = require('express');
const mongoose = require('mongoose');
const postModel = require('../models/postmodel');
const commentModel = require('../models/comment');
const userModel = require('../models/user');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

mongoose.set('useFindAndModify', false);
// this endpoint is for creating
// the post
router.post('/create',verifyToken, async (req, res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const post = new postModel({
    title:title,
    content:content,
    likes:0,
    dislikes:0,
    creator:req.user._id
  });
  try{
    const savedPost = await post.save()
    const updateUser = await userModel.findOneAndUpdate(
      {_id:req.user._id},
      {$push:{
        posts:post
      }}
    );
    if (savedPost) {
      return res.status(200).json({
        message:savedPost
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

// this endpoint is for retrieving all the
// posts created by the user
router.get('/posts',verifyToken, async (req, res) =>{
  try{
    const posts = await postModel.find({_id:req.user._id});
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

// this endpoint is for deleting a particular
// post of the user
router.delete('/delete/:id', async (req, res)=>{
  const id = req.params.id;
  try{
    const post = await postModel.find({
      _id:id
    });
    const comments = post[0].comment
    // this function is to delete all the
    // comments of the post which is going to be
    // deleted
    const deleteComment = async comments =>{
      try{
        for (var i = 0; i < comments.length; i++) {
          const comment = await commentModel.findOne({_id:comments[i]})
          console.log(comment);
          comment.delete()
        }
      }catch(err){
        return res.json({message:'Something went wrong'})
      }
    }
    deleteComment(comments);
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

// this endpoint is for liking the post
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

// this endpoint is for disliking the post
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

// this endpoint is for commenting on a
// partricular post by the user
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

// this endpoint is to get all the comments of
// the a partiicular post with id postid
router.get('/getcomment/:postid', async (req, res) =>{
  try{
    const postid = req.params.postid;
    console.log(postid);
    const post = await postModel.findOne({
      _id:postid
    });
    console.log(post);
    if (!post) {
      return res.status(400).json({
        message:'Something went wrong'
      });
    }
    return res.status(200).json({
      message:post.comment
    })
  }catch(err){
    console.log(err);
    return res.status(400).json({
      message:'Something went wrong'
    });
  }
});

module.exports = router;
