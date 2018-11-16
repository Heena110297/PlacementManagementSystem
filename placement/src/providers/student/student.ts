import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentProvider {
  name: String;
	department: String;
	cgpa:String;
	emailid:String;
	rollno: Number;
	companies:[String];
  url = "http://192.168.137.1:";
data:any;
dataN: any; 

  constructor(public http: Http) {
    this.data =null;
    this.dataN = null;
    console.log('Hello StudentProvider Provider');
  }

  getStudents()
 	{

 	if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.url+"3000/api/students").map(res =>res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

 	}
deleteStudent(id)
    {
    console.log(id);
  return this.http.delete(this.url+"3000/api/removestudent/"+id).subscribe((res) =>{console.log(res.json());
  });
  }
 
 addStudent(info)
    {
  return this.http.post(this.url+"3000/api/registerstudent",info).subscribe((res) =>{console.log(res.json());
  });
  }

  updateStudent(id , info)
    {
  return this.http.put(this.url+"3000/api/updatestudent/"+id,info).subscribe((res) =>{console.log(res.json());
  });
  }
  
  getStudent(id)
  {
    
  
  return new Promise(resolve=>{
 this.http.get(this.url+"3000/api/show/"+id).map(
 res =>res.json())
 .subscribe(dataN=>{
 this.dataN = dataN;
 resolve(this.dataN);
 
  });
 	
  });
  
}
}
