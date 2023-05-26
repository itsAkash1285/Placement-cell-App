const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    interviewStatus:{
        type:String,
        required:true
    }
},{timestamps:true});

const Interview=mongoose.model('Interview',interviewSchema);

module.exports=Interview;