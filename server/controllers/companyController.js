var Company = require('../models/company');

// Display list of all Comapnies.
exports.company_list = function(callback,limit){
	Company.find(callback).limit(limit);
};


//add Company
module.exports.company_create = function(company,callback){
    Company.create(company,callback);
};

module.exports.getCompany = function(id,callback){
	
	Company.find({_id:id},callback);
}

module.exports.company_remove = function(id,callback){
	Company.findOneAndRemove( {_id:id},callback);
};

module.exports.company_update = function(id,company,options,callback){
	var query = {_id: id};
	var update = {
		 name: company.name,
	     emailid: company.emailid,
		 profile: company.profile,
		 cgpaCriteria: company.cgpaCriteria
	};
	
	Company.findOneAndUpdate(query,update,options,callback);
}

module.exports.company_find=function(name,company,callback)
	{
	  var query = {name:name};
		// Student.find(query,callback);
		 Company.find(query,callback);
	};
	
module.exports.company_R2S=function(name,studentName,callback)
{
Company.find({name:name},callback).update({$push:{students:studentName}},callback);
		 
};