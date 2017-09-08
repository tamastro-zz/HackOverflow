var express = require('express');
var router = express.Router();
var controller = require('../controllers/questioncontroller')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
/* GET users listing. */
router.get('/', controller.getquestions);

router.get('/:id', controller.getquestion);

router.post('/', controller.postquestion);

router.post('/:id/answer', controller.postanswer);

router.post('/:id/up', controller.votequestionup);

router.post('/:id/down', controller.votequestiondown);

router.post('/:id/:ida/down', controller.voteanswerdown);

router.post('/:id/:ida/up', controller.voteanswerup);

router.patch('/:id', controller.editquestion);

router.delete('/:id', controller.deletequestion);

module.exports = router;