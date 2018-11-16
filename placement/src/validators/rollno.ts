import {FormControl} from '@angular/forms';

export class RollnoValidator 
{
	static isValid(control: FormControl):any{
	   if(isNaN(control.value)){
	   return{
	   "not a number" : true
	   };
	  }
	  if(control.value>999){
	     return{
         "Invalid Roll Number" :true
	     };
	  }
	  if(control.value<0)
	  {
	    return{
	    "Invalid Roll Number" :true
	    };
	  }

	  return null;
	}
}