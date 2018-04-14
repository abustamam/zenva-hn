const path = require('path')
const express = require('express')

const { start } = require('./api/app')

const host = process.env.HOST
const port = process.env.PORT
const secret = process.env.JWT_SECRET

const app = express()
app.use('/', express.static(path.join(__dirname, './client/build')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')))

start({ app, host, port, secret })