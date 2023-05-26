const passport=require('passport');
const express=require('express');
const router=express.Router();

const interviewController=require('../controller/interview_controller');

//company-page
router.get('/add-company-page',passport.checkAuthentication,interviewController.addCompanyPage);

//create new company
router.post('/create-company',passport.checkAuthentication,interviewController.createNewCompany);

//add Interview for student
router.get('/add-student-interview/:id',passport.checkAuthentication,interviewController.addStudentInterview)

//assign interview to student
router.post('/add-interview-to-student',passport.checkAuthentication,interviewController.assignInterviewToStudent);

//update status of interview
router.post('/update-interview-status/:id',passport.checkAuthentication,interviewController.updateInterviewStatus)

//delete company
router.get('/delete-conpany/:id',passport.checkAuthentication,interviewController.deleteCompany)

module.exports=router;