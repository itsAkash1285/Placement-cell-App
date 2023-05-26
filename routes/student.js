const express = require('express');
const passport = require('passport');

const router = express.Router();

const studentController = require('../controller/student_controller');

//display student page
router.get('/add-student-page', passport.checkAuthentication, studentController.addStudentPage)

//create student
router.post('/create-student', passport.checkAuthentication, studentController.createStduent);

//delete student
router.get('/delete/:id', passport.checkAuthentication, studentController.deleteStduent);

//view full info of student
router.get('/view-student/:id', passport.checkAuthentication, studentController.viewStudent);

//update student details
router.post('/update-student/:id', passport.checkAuthentication, studentController.updateStudent);

module.exports = router;