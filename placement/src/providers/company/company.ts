import { Http,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {
name:String;
  emailid :String;
  profile:String;
  cgpaCriteria:Number;
  students:[String];
  data:any;
dataN: any;
dataM:any; 
 url = "http://192.168.137.1:";
  constructor(public http: Http) {
    this.data =null;
    this.dataN = null;
    this.dataM = null;
    console.log('Hello CompanyProvider Provider');
  }

 getCompanies()
 	{

 	if (this.data) {
      return Promise.resolve(this.data);
    }
     return new Promise(resolve => {
     this.http.get(this.url+"3000/api/company").map(res =>res.json())
     .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

 	}
  addCompany(info)
    {
  return this.http.post(this.url+"3000/api/registercompany",info).subscribe((res) =>{console.log(res.json());
  });
  }

  deleteCompany(id)
    {
    console.log(id);
  return this.http.delete(this.url+"3000/api/unregistercompany/"+id).subscribe((res) =>{console.log(res.json());
  });
  }

  getCompany(id)
  {
   
  
  return new Promise(resolve=>{
 this.http.get(this.url+"3000/api/showCompany/"+id).map(
 res =>res.json())
 .subscribe(dataN=>{
 this.dataN = dataN;
 resolve(this.dataN);
 
  });
  
  });

}

updateCompany(id , info)
    {
  return this.http.put(this.url+"3000/api/updatecompany/"+id,info).subscribe((res) =>{console.log(res.json());
  });
  }

  findStudents(cgpaCriteria,profile)
  {

  
     return new Promise(resolve => {
     this.http.get(this.url+"3000/api/findStudent/"+cgpaCriteria+"/"+profile).map(res =>res.json())
     .subscribe(dataM => {
          this.dataM = dataM;
          resolve(this.dataM);
        });
    });

  }

  registerStudent(id,cName)
    {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  return this.http.put(this.url+"3000/api/registerOnlyThisStudent/"+id+"/"+cName,{headers:headers}).subscribe((res) =>{console.log(res.json());
  });
  }

  markRegistered(id)
    {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  return this.http.put(this.url+"3000/api/markRegistered/"+id,{headers:headers}).subscribe((res) =>{console.log(res.json());
  });
  }

  unRegister(sName ,cName )
    {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  return this.http.put(this.url+"3000/api/UnRegister/"+sName+"/"+cName,{headers:headers}).subscribe((res) =>{console.log(res.json());
  });
  }
  
}
