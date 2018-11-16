import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';


/**
 * Generated class for the ViewRegisteredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-registered',
  templateUrl: 'view-registered.html',
})
export class ViewRegisteredPage {
  company:any;
  id:any;
  students: any;

  constructor(
  public navCtrl: NavController,
  public companyService: CompanyProvider,
  public navParams: NavParams) {
  this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRegisteredPage');
    this.companyService.getCompany(this.id).then((dataN)=>{
    console.log(dataN);
    this.company = dataN;
    this.students = this.company[0].students;
    console.log(this.company[0].students);
  
  });
  }

  unRegisterStudent(sName,index)
  {
  if(index>-1)
     {
       this.students.splice(index,1);
     }
    this.companyService.unRegister(sName,this.company[0].name);
  }

}
