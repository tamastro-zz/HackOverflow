const question = require('../models/question')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

exports.getquestion = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.find({})
  .populate('author answer.user vote answer.user.vote')
  // .populate({ path: 'answer.user'})
  .then(data => {
    res.send(data)
  })
}

exports.postquestion = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.create({
    author: decode.id,
    title: req.body.title,
    text: req.body.title,
    answer: [],
    vote:[]
  })
  .then(data => {
    res.send(data)
  })
}

exports.postanswer = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.updateOne({
    _id: req.body.qid
  }, {
    $push: {
      answer: {
        text: req.body.atext,
        user: decode.id,
        vote: []
      }
    }
  })
  .then(data => {
    res.send(data)
  })
}