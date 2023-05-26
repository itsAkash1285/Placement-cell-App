//sign up page employee
module.exports.signInPage = function (req, res) {
    //if user is sign in don't show this page
    if (req.isAuthenticated()) {
        return res.redirect("/user/dashboard");
    }
    //if not sign in show page
    return res.render('signin', {
        title: "SignInPage"
    })
}

//sign up page employee
module.exports.signUpPage = function (req, res) {
    //if user is sign in don't show this page
    if (req.isAuthenticated()) {
        return res.redirect("/user/dashboard");
    }
    //if not sign in show page
    return res.render('signup', {
        title: "SignUnPage"
    })
}