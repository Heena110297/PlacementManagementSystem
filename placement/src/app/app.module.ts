import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';

import { WelcomePage } from '../pages/welcome/welcome';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserListPage } from '../pages/user-list/user-list';
import { CompanyListPage } from '../pages/company-list/company-list';
import { AddStudentPage } from '../pages/add-student/add-student';
import { ViewStudentPage } from '../pages/view-student/view-student';
import { EditStudentPage } from '../pages/edit-student/edit-student';
import { AddCompanyPage } from '../pages/add-company/add-company';
import { ViewCompanyPage } from '../pages/view-company/view-company';
import { EditCompanyPage } from '../pages/edit-company/edit-company';
import { ViewEligiblePage } from '../pages/view-eligible/view-eligible';
import { ViewRegisteredPage } from '../pages/view-registered/view-registered';
import { CompanyProvider } from '../providers/company/company';
import { StudentProvider } from '../providers/student/student';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserListPage,
    CompanyListPage,
    AddStudentPage,
    ViewStudentPage,
    EditStudentPage,
    AddCompanyPage,
    ViewCompanyPage,
    EditCompanyPage,
    ViewRegisteredPage,
    ViewEligiblePage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserListPage,
    CompanyListPage,
    AddStudentPage,
    ViewStudentPage,
    EditStudentPage,
    AddCompanyPage,
    ViewCompanyPage,
    EditCompanyPage,
    ViewRegisteredPage,
    ViewEligiblePage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompanyProvider,
    StudentProvider
  ]
})
export class AppModule {}
