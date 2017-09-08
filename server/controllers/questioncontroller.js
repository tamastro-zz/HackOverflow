const question = require('../models/question')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

exports.getquestions = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.find({})
    // .populate('author answer.user vote.up vote.down answer.user.vote.up answer.user.vote.down')
    // .populate({ path: 'answer.user'})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.getquestion = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.findOne({
      _id: req.params.id
    })
    .populate('author answer.user vote.up vote.down answer.user.vote.up answer.user.vote.down')
    // .populate({ path: 'answer.user'})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.postquestion = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.create({
      author: decode.id,
      title: req.body.title,
      text: req.body.text,
      answer: [],
      vote: []
    })
    .then(data => {
      res.send(data)
    })
}

exports.postanswer = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.updateOne({
      _id: req.params.id
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

exports.editquestion = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.updateOne({
      _id: req.params.id,
      author: decode.id
    }, {
      text: req.body.text
    })
    .then(data => {
      res.send(data)
    })
}

exports.deletequestion = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.deleteOne({
      _id: req.params.id
    })
    .then(data => {
      res.send(data)
    })
}

exports.votequestionup = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.findOne({
      _id: req.params.id,
      'vote.down': decode.id
    })
    .then(checkdown => {
      // check upvote ada atau tidak
      if (checkdown !== null) {
        // kalau ada delete upvote
        question.updateOne({
            _id: req.params.id
          }, {
            $pull: {
              'vote.down': decode.id
            }
          })
          .then(deleteup => {
            question.updateOne({
                _id: req.params.id,
              }, {
                $push: {
                  'vote.up': decode.id
                }
              })
              .then(data => {
                res.send(data)
              })
          })
      } else {
        // check sudah vote
        question.findOne({
            _id: req.params.id,
            'vote.up': decode.id
          })
          .then(findupdvote => {
            if (findupdvote !== null) {
              console.log('if');
              question.updateOne({
                  _id: req.params.id
                }, {
                  $pull: {
                    'vote.up': decode.id
                  }
                })
                .then(data => {
                  res.send(data)
                })
            } else {
              console.log('else');
              question.updateOne({
                  _id: req.params.id
                }, {
                  $push: {
                    'vote.up': decode.id
                  }
                })
                .then(data => {
                  res.send(data)
                })
                .catch(err => {
                  res.send(err)
                })
            }
          })
      }
    })
}

exports.votequestiondown = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.findOne({
    _id: req.params.id,
    'vote.up': decode.id
  })
    .then(checkdown => {
      // check upvote ada atau tidak
      if (checkdown !== null) {
        // kalau ada delete upvote
        question.updateOne({
          _id: req.params.id
        }, {
            $pull: {
              'vote.up': decode.id
            }
          })
          .then(deleteup => {
            question.updateOne({
              _id: req.params.id,
            }, {
                $push: {
                  'vote.down': decode.id
                }
              })
              .then(data => {
                res.send(data)
              })
          })
      } else {
        // check sudah vote
        question.findOne({
          _id: req.params.id,
          'vote.down': decode.id
        })
          .then(findupdvote => {
            if (findupdvote !== null) {
              console.log('if');
              question.updateOne({
                _id: req.params.id
              }, {
                  $pull: {
                    'vote.down': decode.id
                  }
                })
                .then(data => {
                  res.send(data)
                })
            } else {
              console.log('else');
              question.updateOne({
                _id: req.params.id
              }, {
                  $push: {
                    'vote.down': decode.id
                  }
                })
                .then(data => {
                  res.send(data)
                })
                .catch(err => {
                  res.send(err)
                })
            }
          })
      }
    })
}

exports.voteanswerdown = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.findOne({
      _id: req.params.id,
      'answer._id': req.params.ida,
      'answer.vote.down': decode.id
    })
    .then(present => {
      if (present == null) {
        question.updateOne({
            _id: req.params.id
          }, {
            $push: {
              answer: {
                vote: {
                  down: decode.id
                }
              }
            }
          })
          .then(data => {
            res.send(data)
          })
      } else {
        res.send('vote ada')
      }
    })
    .catch(err => {
      res.send(err)
    })
}

exports.voteanswerup = (req, res) => {
  var token = req.headers.token
  var decode = jwt.verify(token, process.env.SECRET)
  question.findOne({
      _id: req.params.id,
      'answer._id': req.params.ida,
      'answer.vote.up': decode.id
    })
    .then(present => {
      if (present == null) {
        question.updateOne({
            _id: req.params.id
          }, {
            $push: {
              answer: {
                vote: {
                  up: decode.id
                }
              }
            }
          })
          .then(data => {
            res.send(data)
          })
      } else {
        res.send('vote ada')
      }
    })
    .catch(err => {
      res.send(err)
    })
}