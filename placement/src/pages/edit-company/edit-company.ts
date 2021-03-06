import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import {CgpaValidator} from '../../validators/cgpa';

import { CompanyProvider } from '../../providers/company/company';
import { CompanyListPage } from '../company-list/company-list';

/**
 * Generated class for the EditCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-company',
  templateUrl: 'edit-company.html',
})
export class EditCompanyPage {

  formgroup:FormGroup ; 
   name : AbstractControl ;
   profile:AbstractControl;
   cgpaCriteria :AbstractControl;
   emailid:AbstractControl;

   submitAttempt: boolean =false;
   company:any;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public companyService: CompanyProvider,
  public formbuilder:FormBuilder) {
   this.company = navParams.get('company');

  this.formgroup = formbuilder.group({
           name : ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-Z ]*'),Validators.required])],
          
           profile : ['',Validators.required],
           cgpaCriteria : ['',Validators.compose([CgpaValidator.isValid,Validators.required])],
           emailid : ['',Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),Validators.required])]


           });
            this.name = this.formgroup.controls['name'];
             
              this.profile = this.formgroup.controls['department'];
               this.cgpaCriteria = this.formgroup.controls['cgpa'];
                this.emailid = this.formgroup.controls['emailid'];
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCompanyPage');
  }

  updateCompany()
  {
    this.submitAttempt =true;
   if(!this.formgroup.valid)
   {
    console.log("invalid form");
   }
   else
   {
    console.log("submitted");
    let company = {
    name:this.formgroup.controls.name.value,
    profile:this.formgroup.controls.profile.value,
    cgpaCriteria:this.formgroup.controls.cgpaCriteria.value,
    emailid:this.formgroup.controls.emailid.value
    };
    this.companyService.updateCompany(this.company._id,company);
    this.navCtrl.push(CompanyListPage);
  }
  }

}
