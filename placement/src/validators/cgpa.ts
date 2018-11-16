import {FormControl} from '@angular/forms';

export class CgpaValidator 
{
	static isValid(control: FormControl):any{
	   if(isNaN(control.value)){
	   return{
	   "not a number" : true
	   };
	  }
	  if(control.value>4){
	     return{
         "Invalid Cgpa" :true
	     };
	  }
	  if(control.value<0)
	  {
	    return{
	    "Invalid Cgpa" :true
	    };
	  }

	  return null;
	}
}