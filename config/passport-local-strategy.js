const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
//importing user db
const UserDB=require('../models/user');

//authonticate user
passport.use(new LocalStrategy({usernameField:'email',passReqToCallback:true},function(req,email,password,done){

        //finding user
        UserDB.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding user inside passport :: ",err);
                return done(err);
            }
            if(!user || user.password != password)
            {
                req.flash("error","Invild Email or Password");
                console.log("Invild Email or Password ");
                return done(null,false);
            }
            //if user is found and password is match  
            return done(null,user);
        })
}));

//serializeUser
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserializeUser
passport.deserializeUser(function(id,done){
    //finding user
    UserDB.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user inside deserializeUser passport :: ",err);
            return done(err);
        }

        return done(null,user);

    })
})

//check user login or not
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/");
}

//set sign in user in locals
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}