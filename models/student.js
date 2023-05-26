const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    batch:{
        type:String,
        required:true
    },
    college:{
        type:String,
        require:true
    },
    dsa_score:{
        type:String,
        required:true
    },
    webd_score:{
        type:String,
        required:true
    },
    react_score:{
        type:String,
        required:true
    },
    placement_status:{
        type:String,
        required:true
    }

},{timestamps:true});

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;