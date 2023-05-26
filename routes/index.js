const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

//sending /user
router.use('/user', require('./user'));

//sending /student
router.use('/student', require('./student'));

// sending /interview
router.use('/interview', require('./interview'));

//download report
router.use('/download', require('./download_report'));

//signin page
router.get('/', homeController.signInPage);

//signup page
router.get('/signup', homeController.signUpPage);


module.exports = router;