const express = require('express')

const User = require('../models/user')
const { signJwt } = require('../services/jwt')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  const { email, username, password } = req.body

  if (email && username && password) {
    const userData = {
      email,
      username,
      password,
    }
    return User.count({
      $or: [
        { email },
        { username },
      ],
    }).exec().then(num => {
      if (num > 0) {
        const error = new Error('Duplicate user')
        error.status = 400
        return next(error)
      }
      User.create(userData).exec().then(user => {
        const token = signJwt(user)
        res.json({
          success: true,
          token,
        })
      }).catch(next)
    }).catch(next)
  }

  const error = new Error('All fields required')
  error.status = 400
  return next(error)
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (email && password) {
    return User.authenticate(email, password).exec().then(user => {
      if (!user) {
        const error = new Error('Wrong email or password')
        error.status = 401
        return next(error)
      }
      const token = signJwt(user)
      return res.json({
        success: true,
        token,
      })
    }).catch(next)
  }

  const error = new Error('All fields required')
  error.status = 400
  return next(error)
})

module.exports = router
