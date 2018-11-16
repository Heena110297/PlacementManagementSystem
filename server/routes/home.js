var express = require('express');
var router = express.Router();

// Require controller modules.
var Student = require('../controllers/studentController');
var Company = require('../controllers/companyController');
var winston = require('winston');


//GET request for displaying the list of all students
//router.get('/students', student_controller.student_list);
//POST request for registering the student 
//router.post('/registerstudent',student_controller.student_create);
//router.get('/removestudent/:rollno' ,student_controller.student_remove);
//router.put('/updatestudent/:_id',student_controller.student_update);
//router.get('/company', company_controller.company_list);
router.get('/home',function(req,res,next){
	res.send('Task Api');
});
router.get('/students', function(req, res,next) {
	Student.student_list(function(err,students){
		if(err)
		{
			return next(err);
		}
		console.log('here');
		res.json(students); // to send 
	});
} );

router.post('/registerstudent',function(req,res,next){
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('emailid','emailid is required').notEmpty();
	req.checkBody('emailid',"The Email entered is not valid").isEmail();
	req.checkBody('department','department is required').notEmpty();
	req.checkBody('rollno','rollno is required').notEmpty();
	req.checkBody('cgpa','cgpa is required').notEmpty();

	let errors = req.validationErrors();
	if(errors)
	{
		res.send(errors);
		return;
	}
	else{
	var student = {
        name: req.body.name,
        emailid :req.body.emailid,
        department:req.body.department,
        rollno: req.body.rollno,
        cgpa: req.body.cgpa
    }
	Student.student_create(student,function(err,student){
		if(err)
		{
			throw err;
		}
		winston.info('Fumction create student is working');
		res.json(student); // to send 
	});
}
});

router.get('/show/:_id', function(req, res,next){
    
     Student.getStudent(req.params._id , function(err,student){
         
         if(err)
         	return next(err);
         //res.send("Sorry,This student does not exist");
         res.json(student);
         winston.log(student);
     });
 });




/*router.delete('/removestudent/:_id',function(req,res)
{
	var
	 id = req.params._id;
	var student = req.body;
	Student.student_remove(id,function(err,student){
		if(err)
		{
			throw err;
		}
		console.log('here also');
		res.json(student); // to send 
	});
});*/

router.delete('/removestudent/:_id',function(req,res,next)
{
	var id = req.params._id;
	var student = req.body;
	
	Student.student_remove(id,function(err,student){
		if(err)
			return next(err);
		
		winston.log(id);
		res.json(student); // to send 
	});
	
});



router.put('/updatestudent/:_id',function(req,res,next)
{
	winston.log('updating info...');
	var id = req.params._id;
	var student = {
        name: req.body.name,
        emailid :req.body.emailid,
        department:req.body.department,
        rollno: req.body.rollno,
        cgpa: req.body.cgpa
    }
	Student.student_update(id,student,{},function(err,student){
		if(err)
		{
			throw err;
		}
		winston.log('Updating Student...');
		res.json(student); // to send 
	});
});

router.get('/findstudent/:cgpa/:department',function(req,res,next)
{
	var cgpa = req.params.cgpa;
	var department = req.params.department ;
	
	Student.student_find(cgpa ,department,function(err,students){
		if(students==null)
			res.send("No Student Found");
		if(err)
			return next(err);
					res.json(students);
	});
	
});

router.get('/findStudent/:cgpa/:department', function(req, res,next) {
	var cgpa = req.params.cgpa;
	var department = req.params.department ;
	Student.student_findS(cgpa,department,function(err,students){
		if(err)
		{
			
			return next(err);
		}
		res.json(students); // to send 
	});
});

router.get('/company', function(req, res,next) {
	Company.company_list(function(err,company){
		if(err)
		{
		return next(err);
		}
		winston.info('Displaying....');
		res.json(company); // to send 
	});
});


router.post('/registercompany',function(req,res){
	req.checkBody('name','Name is required').notEmpty();
	req.checkBody('emailid','emailid is required').notEmpty();
	req.checkBody('emailid',"The Email entered is not valid").isEmail();
	req.checkBody('profile','Profile is required').notEmpty();
	req.checkBody('cgpaCriteria','cgpa is required').notEmpty();

	let errors = req.validationErrors();
	if(errors)
	{
		res.send(errors);
		return;
	}
	else{
	var company = {
        name: req.body.name,
        emailid :req.body.emailid,
        profile:req.body.profile,
        cgpaCriteria: req.body.cgpaCriteria
    }
	Company.company_create(company,function(err,company){
		if(err)
		{
			throw err;
		}
		winston.log('Creating Company......');
		res.json(company); // to send 
	});
   }
});

router.delete('/unregistercompany/:id',function(req,res,next)
{
	var id = req.params.id;
	var company = req.body;
	
	Company.company_remove(id,function(err,company){
		if(err)
			return next(err);
		winston.log(id);
		res.json(company); // to send 
	});
});	
router.get('/showcompany/:_id', function(req, res,next){
    
     Company.getCompany(req.params._id , function(err,company){
         if(err) return next(err);
         res.json(company);
         winston.log(company);
     });
 });

router.put('/updatecompany/:_id',function(req,res)
{
	console.log('yahi hu mai');
	var id = req.params._id;
	var company = {
        name: req.body.name,
        emailid :req.body.emailid,
        profile:req.body.profile,
        cgpaCriteria: req.body.cgpaCriteria
    }
	Company.company_update(id,company,{},function(err,company){
		if(err)
		{
			throw err;
		}
		winston.log('Updating Company...');
		res.json(company); // to send 
	});
});

router.get('/registerS2C/:name',function(req,res,next)
{ //find cgpa profile
// find students that match the criteria 
// push student in company and push company in student 
    var name = req.params.name;
	//var cgpa = req.params.cgpa;
	//var department = req.params.department ;
	var company = req.body;
	Company.company_find(name,company,function(err,company){
		if(err)
			return next(err);
		
		//console.log(req.body.company.name);
		res.send(company);
		var cgpa = company[0].cgpaCriteria;
		var dept = company[0].profile;
		//console.log();
		var student = req.body;
	    Student.student_find(cgpa,dept,function(err,student){
		if(err)
			throw err;
		//res.json(student);
		//console.log(student);
		for(var myKey in student)
		{
			studentName = student[myKey].name;
			Company.company_R2S(name,studentName,function(err){
				if(err)
					throw err;
		});
		}
		
		//console.log(student);
		/*Student.student_R2C(name,student,{},function(err,student)
		{
			if(err)
				throw err;
			console.log(student);
		});
	*/

	});
	
		
	});
	//var cgpa = req.body.company.cgpaCriteria;
		
});



module.exports = router;