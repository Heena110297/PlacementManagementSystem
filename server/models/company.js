var mongoose = require('mongoose');

//Student Schema for the application

var companySchema = mongoose.Schema({
  name:
  {type :String,
  	required :true,
  	unique:true
  },
  emailid :
  {type :String,
  	required :true,
  	unique:true
  },
  profile:String,
  cgpaCriteria:{type :Number,
  	required :true,
  },
  students:[String]
});

var Company = module.exports = mongoose.model('Company',companySchema);