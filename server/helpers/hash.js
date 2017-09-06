const crypto = require('crypto');

function randomStr(m) {
  var m = m || 9;
  s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < m; i++) {
    s += r.charAt(Math.floor(Math.random() * r.length));
  }
  return s;
}

function hashish(password, salt) {
  let hash = crypto.createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  return hash;
}


module.exports = {
  randomStr,
  hashish
};
