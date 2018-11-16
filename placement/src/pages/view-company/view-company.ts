import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';
import { EditCompanyPage } from '../edit-company/edit-company';

/**
 * Generated class for the ViewCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-company',
  templateUrl: 'view-company.html',
})
export class ViewCompanyPage {
id : any;
  company:any;
  name:string;

  constructor(
  public navCtrl: NavController,
  public companyService: CompanyProvider,
   public navParams: NavParams) {
   this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCompanyPage');
    this.companyService.getCompany(this.id).then((dataN)=>{
    console.log(dataN);
    this.company = dataN;
    console.log(this.company[0].name);
  
  });
  }
editCompany(company)
  {
   
    this.navCtrl.push(EditCompanyPage,{company:company});
  }

}
