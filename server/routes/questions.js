var express = require('express');
var router = express.Router();
var controller = require('../controllers/questioncontroller')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
/* GET users listing. */
router.get('/', controller.getquestions);

router.get('/:id', controller.getquestion);

router.post('/', controller.postquestion);

router.post('/:id', controller.postanswer);

router.post('/:id/up', controller.votequestionup);

router.post('/:id/down', controller.votequestiondown);

router.patch('/:id/down', controller.voteanswerdown);

router.patch('/:id/up', controller.voteanswerup);

router.patch('/:id', controller.editquestion);

router.delete('/:id', controller.deletequestion);

module.exports = router;