const mongoose=require('mongoose');

const companySchema=new mongoose.Schema({
    company_name:{
        type:String,
        required:true,
        unique:true
    },
    interview_date:{
        type:String,
        required:true
    },
    work_location:{
        type:String,
        required:true
    },
},{timestamps:true});

const Company=mongoose.model('Company',companySchema);

module.exports=Company;