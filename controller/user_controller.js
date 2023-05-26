const UserDB=require('../models/user');
const StudentDB=require('../models/student');
const CompanyDB=require('../models/Company');

//create new user
module.exports.createUser=function(req,res){
    //checking both password match or not
    if(req.body.password != req.body.ConformPassword){
        req.flash("error","Password and Confirm Password not match!");
        return res.redirect('back');
    }
    //finding user allready exist in db or not  
    UserDB.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user inside createUser :: ",err);
            return;
        }
        //if already exist 
        if(user){
            req.flash("error","Email already exist ..!");
            console.log("Email is already exist ..!");
            return res.redirect('/');
        }
        //if user is not found then create new user
        UserDB.create(req.body,function(err,newUser){
            if(err){
                console.log("error in creating user inside createUser :: ",err);
                return;
            }
            req.flash("success","User create successfully..!");
            return res.redirect('/');
        })
    })
}

//create session means sign in user
module.exports.createSession=function(req,res){
    req.flash("success","Sign-in successfully");
    return res.redirect('/user/dashboard');
}

//Dashboard
module.exports.dashboard=function(req,res){
    //finding all students
    StudentDB.find({},function(err,allStudent){
        if(err){
            console.log("error in finding Student inside Dashboard :: ",err);
            return;
        }
        //finding all company
        CompanyDB.find({},function(err,allCompany){
            if(err){
                console.log("error in finding Company inside Dashboard :: ",err);
                return;
            }
            return res.render('Dashboard',{
                title:"Dashboard",
                allStudent:allStudent,
                allCompany:allCompany
            });
        })       
    })
   
}
//signout
module.exports.signOut=function(req,res){
    // logout
    req.logout(function(err){
        if(err){
            console.log(err);
            return;
        }
        req.flash("success","Sign-out successfully");
        return res.redirect('/');
    })    
}