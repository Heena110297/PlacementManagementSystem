import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserListPage } from '../user-list/user-list';
import { CompanyListPage } from '../company-list/company-list';
import { StudentProvider } from '../../providers/student/student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openUserListPage(){
		this.navCtrl.push(UserListPage);
	}

	openCompanyListPage(){
		this.navCtrl.push(CompanyListPage);
	}

}
