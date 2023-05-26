const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/notification_middelware');

var dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();
//set ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);

//ejs layout
app.use(expressLayout);
//access static file
app.use(express.static('./assets'));
//adding body-parser for form data
app.use(bodyParser.urlencoded({ extended: false }));
//for storing cookie and incript 
app.use(expressSession({
    name: 'user_id',
    secret: 'AnyValue',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10000 * 60 * 100)
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI||'mongodb://localhost/career-camp-db',
        autoRemove: false
    }, function (err) {
        console.log(err || "connect-mongo setup ok");
    })
}));

//use passport for authentication
app.use(passport.initialize());
app.use(passport.session());
//set use in locals for views
app.use(passport.setAuthenticatedUser);
//for notification
app.use(flash());
app.use(customMware.setFlash);

//handling urls 
app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log("Error in server run :: ", err);
        return;
    }
    console.log(`server is up on ${port} port`);
})
