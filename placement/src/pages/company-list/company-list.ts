import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';
import { AddCompanyPage } from '../add-company/add-company';
import { ViewCompanyPage } from '../view-company/view-company';
import { ViewEligiblePage } from '../view-eligible/view-eligible';
import { ViewRegisteredPage } from '../view-registered/view-registered';

/**
 * Generated class for the CompanyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html',
})
export class CompanyListPage {
 companies :any;

  constructor(public navCtrl: NavController,public companyService: CompanyProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyListPage');
     this.companyService.getCompanies().then((data)=>{
    console.log(data);
    this.companies = data;
  
    });
  }

  addCompany()
  {
    this.navCtrl.push(AddCompanyPage);
  }
  deleteCompany(id,index)
  {
     this.companyService.deleteCompany(id);
     if(index>-1)
     {
       this.companies.splice(index,1);
     }
      console.log(id);
  }

 viewCompany(id)
 {
    console.log(id);
    this.navCtrl.push(ViewCompanyPage,{id:id});
 }
 viewEligible(id)
 {
    this.navCtrl.push(ViewEligiblePage,{id:id});
 }

 viewRegistered(id)
 {
 console.log(id);
  this.navCtrl.push(ViewRegisteredPage,{id:id});
  }
 
} 
