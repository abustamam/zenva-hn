const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const auth = require('./routes/auth')
const post = require('./routes/post')
const comment = require('./routes/comment')

const app = express()

const port = process.env.PORT || 3500
mongoose.connect('mongodb://localhost/zenva-hn')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  // connected
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth', auth)
app.use('/api/posts', post)
app.use('/api/comments', comment)

app.use((req, res, next) => {
  const err = new Error('File Not found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => res.status(err.status || 500).json({ message: err.message }))

app.listen(port, () => {
  console.log('Express app listening on port 3500')
})
