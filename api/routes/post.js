const express = require('express')
const router = express.Router()

const Post = require('../models/post')
const Comment = require('../models/comment')
const { authJwt } = require('../services/jwt')

router.get('/', (req, res, next) => {
  Post.find({}).exec().then(posts => {
    res.json({ success: true, posts })
  }).catch(next)
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Post.findOne({ _id: id }).populate('author').exec().then(post => {
    Comment.find({ post: id }).exec().then(comments => {
      post.comments = comments
      res.json({ success: true, post })
    }).catch(next)
  }).catch(next)
})

router.post('/', authJwt, (req, res, next) => {
  const { title, url, text } = req.body
  const { userId } = req.decoded
  const postData = { title, author: userId }
  if (text) {
    postData.text = text
  }
  if (url) {
    postData.url = url
    delete postData.text
  }
  Post.create(postData).exec().then(post => {
    res.json({
      success: true,
      post,
    })
  }).catch(next)
})

module.exports = router