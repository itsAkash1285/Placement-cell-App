const express=require('express');
const passport=require('passport');
const router=express.Router();

const downloadController=require('../controller/download_controller');
//handling download report 
router.get('/report-download',passport.checkAuthentication,downloadController.downloadCSV);

module.exports=router;