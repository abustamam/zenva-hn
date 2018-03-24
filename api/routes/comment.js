const express = require('express')
const router = express.Router()

const Comment = require('./../models/comment')
const { authJwt } = require('../services/jwt')

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Comment.findOne({ _id: id }).populate('author').exec().then(comment => {
    res.json({ success: true, comment })
  }).catch(next)
})

router.post('/', authJwt, (req, res, next) => {
  const { text, postId } = req.body
  const { userId } = req.decoded

  const commentData = { text, author: userId, post: postId }

  Comment.create(commentData).exec().then(comment => {
    res.json({
      success: true,
      comment,
    })
  }).catch(next)
})

module.exports = router