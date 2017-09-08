'use strict'
var answerschema = require('./answer')
var mongoose = require('mongoose')

var questionSchema = mongoose.Schema({
  title: String,
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  answer: [answerschema],
  vote: {
    up: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    down: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }]
  }
}, {
  timestamps: true
})

var questionModel = mongoose.model('question', questionSchema);


module.exports = questionModel