const express = require('express')
const router = express.Router()

const Comment = require('./../models/comment')
const { authJwt } = require('../services/jwt')
const { removeEl } = require('./../util')

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

router.delete('/:id', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId, role } = req.decoded
  Comment.findById(id).exec().then(comment => {
    if (role !== 'admin' || userId !== comment.author) {
      return next('Unauthorized to do this')
    }
    comment.remove().then(() => res.json({ success: true })).catch(next)
  }).catch(next)
})

router.post('/:id/upvote', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId } = req.decoded

  Comment.findById(id).exec().then(comment => {
    console.log({ comment })
    if (comment.upVotes.includes(userId)) {
      return next('Cannot vote twice on the same item')
    }
    comment.upVotes.push(userId)
    comment.downVotes = removeEl(comment.downVotes, userId)
    comment.save()
    res.json({
      success: true,
      comment,
    })
  }).catch(next)
})

router.post('/:id/downvote', authJwt, (req, res, next) => {
  const { id } = req.params
  const { userId } = req.decoded

  Comment.findById(id).exec().then(comment => {
    console.log({ comment })
    if (comment.downVotes.includes(userId)) {
      return next('Cannot vote twice on the same item')
    }
    comment.downVotes.push(userId)
    comment.upVotes = removeEl(comment.upVotes, userId)

    comment.save()
    res.json({
      success: true,
      comment,
    })
  }).catch(next)
})

module.exports = router