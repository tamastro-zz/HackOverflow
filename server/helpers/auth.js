const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.auth = function (req, res, next) {
  token = req.headers.token
  if (token) {
    next()
  } else {
    res.send('not authorize')
  }
}