const mongoose=require('mongoose');
var dotenv = require('dotenv').config();

mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://tusharj8788:12345@cluster0.vcawsu8.mongodb.net/pleacementcell?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// console.log(process.env);
mongoose.connect(process.env.MONGO_URI||'mongodb://localhost/career-camp-db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in Connect with DB"));

db.once('open',function(){
    console.log("Successfuly connected into db");
})

module.exports=db;
