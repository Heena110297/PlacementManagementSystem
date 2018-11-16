var mongoose = require('mongoose');

//Student Schema for the application

var studentSchema = mongoose.Schema({
  name:{
  	type: String,
  	 required:true,
     unique:true
     
  },
  emailid :{
  	type: String,
  	 required:true,
     unique:true
  }, 
  department:{
  	type: String,
  	 required:true
  },
  rollno:{
  	type: String,
  	 required:true,
     unique:true
  },
  cgpa:{
  	type: Number,
  	 required:true
  },
  companies:[String]
});

var Student = module.exports = mongoose.model('Student',studentSchema);