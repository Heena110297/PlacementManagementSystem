
var Student = require('../models/student');
var Company = require('../models/student');
// Display list of all students
module.exports.student_list = function(callback,limit){
	Student.find(callback).limit(limit);
};

module.exports.getStudent = function(id,callback){
	var query ={_id:id};
	Student.find({_id:id},callback);
}

// Register a Student 
module.exports.student_create = function(student,callback){
	Student.create(student,callback);
}



//Remove Student using roll no 
module.exports.student_remove = function(id,callback){
	var query = {_id:id};
	Student.findOneAndRemove( {_id:id},callback);
}





//edit Student details
module.exports.student_update = function(id,student,options,callback){
	var query = {_id: id};
	var update = {
		 name: student.name,
	     emailid: student.emailid,
		 department: student.department,
		 rollno: student.rollno,
		 cgpa: student.cgpa,
	};
	
	Student.findOneAndUpdate(query,update,options,callback);
}


//to find students based pn cgpa and department 
	module.exports.student_find=function(cgpa ,department,callback,limit)
	{
	  var query = {department: department};
		// Student.find(query,callback);
		  //console.log(student);
		  Student.find(query,callback).gt('cgpa',cgpa).limit(limit);
		 //Student.find(query,callback).gt('cgpa',cgpa).updateMany({$push:{companies:name}},callback);
		 //console.log(student);
		 
	    //console.log(result);
	};
	
	module.exports.student_findS = function(cgpa,department,callback,limit){
		var query = {department: department};
	Student.find(query,callback).gt('cgpa',cgpa).limit(limit);
};
	/*module.exports.student_find=function(cgpa ,department,name,student,options,callback)
	{
	  var query = {department: department};
		console.log("yeh hao dept"+department);
		// Student.find(query,callback);
		 Student.find(query,callback).gt('cgpa',cgpa).update({$push:{companies:name}},callback);
	};*/

	
	//function for registering students to company 
	module.exports.student_R2C=function(name,student,options,callback)
	{
		winston.log("Function student_R2C is working(Inside)");
		for(var myKey in student) {
       //console.log("key:"+myKey+", value:"+student[myKey]);}
	Student.update({$push: {companies:name}},callback);}
	};
	
	
