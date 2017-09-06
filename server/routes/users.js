var express = require('express');
var router = express.Router();
var controller = require('../controllers/usercontroller')

/* GET users listing. */
router.get('/', controller.getusers);

router.post('/signin', controller.signin);

router.post('/signup', controller.signup);

module.exports = router;
