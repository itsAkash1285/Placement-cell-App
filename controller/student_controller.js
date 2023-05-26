const StduentDB=require('../models/student');
const InterviewDB=require('../models/interview');

//add student page
module.exports.addStudentPage=function(req,res){
    return res.render('StudentForm',{
        title:"Add Student"
    })
}

//create student
module.exports.createStduent=function(req,res){
    //first check student already present in db or not 
    StduentDB.findOne({email:req.body.email},function(err,student){
        if(err){
            console.log("Error in finding student in side createStudent ",err);
            return;
        }
        //if student is availabel just return 
        if(student){
            req.flash("error","Student is Allready Exists..!");
            console.log("Student is Allready Exists..");
            return res.redirect('back');
        }
        //if student  is not found then create newStudent
        StduentDB.create(req.body,function(err,newStudent){
            if(err){
                console.log("Error in creating student in side createStudent ",err);
                return;
            }
            req.flash("success","Student create successfully..!");
            return res.redirect('back');
        })

    })    
}

//delete student 
module.exports.deleteStduent=function(req,res){
    //first find student
    StduentDB.findById(req.params.id,function(err,student){
        if(err){
            console.log("Error in finding student in side createStudent ",err);
            return;
        }
        //if stduent not found just return
        if(!student){
            req.flash("error","Student Not found..!");
            return res.redirect("back");
        }
        //storing student id 
        let studentId=student.id;
        //delete student 
        student.remove();
        req.flash("success","Student and associated interview is deleted successfully..!");
        //also delete all interviews for student 
        InterviewDB.deleteMany({student:studentId},function(err,interview){
            if(err){
                console.log("error in deleteing interview in deleteCompany :: ",err)
                return;
            }
           
            return res.redirect('/');
        })
    })
}

//view student page and show schedule interview 
module.exports.viewStudent=function(req,res){
    //find student using id
    StduentDB.findById(req.params.id,function(err,student){
        if(err){
            console.log("Error in finding student in side viewStudent ",err);
            return;
        }

        // finding all schedule interview
        InterviewDB.find({student:student.id}).populate('company').exec(function(err,interviewList){
            if(err){
                console.log("Error in finding interview in CompanyDB in side viewStudent ",err);
                return;
            }
            // return all interview as well as student
            return res.render('studentView',{
                title:"Student View",
                student:student,
                interviewList:interviewList
            })
        })
    })
}

//update student
module.exports.updateStudent=function(req,res){

    StduentDB.findByIdAndUpdate(req.params.id,req.body,function(err,updatedStudent){
        if(err){
            console.log("Error in updating  student in side updateStudent :: ",err);
            return;
        }
        req.flash("success","Student data update successfully..!");
        return res.redirect("back");
    })
}