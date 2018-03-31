const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
})

UserSchema.statics.authenticate = (email, password, cb) => {
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return cb(err)
    }
    if (!user) {
      const err = new Error('User not found')
      err.status = 401
      return cb(err)
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return cb(null, user)
      }
      return cb()
    })
  })
}

UserSchema.pre('save', function(next) {
  const user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

const User = mongoose.model('User', UserSchema)

module.exports = User
