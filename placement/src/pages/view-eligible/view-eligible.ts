import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';

/**
 * Generated class for the ViewEligiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-eligible',
  templateUrl: 'view-eligible.html',
})
export class ViewEligiblePage {
 id : any;
 company:any;
 students:any;
  constructor(public navCtrl: NavController, 
  public companyService: CompanyProvider,
  public navParams: NavParams) {
   this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEligiblePage');
     this.companyService.getCompany(this.id).then((dataN)=>{
    console.log(dataN);
    this.company = dataN;
    console.log(this.company[0].name);
    this.companyService.findStudents(this.company[0].cgpaCriteria,this.company[0].profile).then((dataM)=>{
    console.log(dataM);
    this.students = dataM;
    });
   });
  }
  registerStudent(id,index)
  {
     if(index>-1)
     {
       this.students.splice(index,1);
     }
      console.log(this.company[0].name);
      
     this.companyService.registerStudent
     (id,this.company[0].name);
     this.companyService.markRegistered(id);
  }
  

 
}
