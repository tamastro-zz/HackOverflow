'use strict'

var mongoose = require('mongoose')

var userschema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  fullname: String,
  salt: String
})

var usermodel = mongoose.model('user', userschema);


module.exports = usermodel