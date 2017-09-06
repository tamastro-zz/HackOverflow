var express = require('express');
var router = express.Router();
var controller = require('../controllers/questioncontroller')

/* GET users listing. */
router.get('/', controller.getquestion);

router.post('/', controller.postquestion);

router.post('/answer', controller.postanswer);

module.exports = router;