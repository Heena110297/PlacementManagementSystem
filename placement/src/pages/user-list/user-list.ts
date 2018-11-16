import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentProvider } from '../../providers/student/student';
import { AddStudentPage } from '../add-student/add-student';
import { ViewStudentPage } from '../view-student/view-student';
/**
 * Generated class for the UserListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
    students :any;

  constructor(public navCtrl: NavController,public studentService: StudentProvider, public navParams: NavParams ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');
    this.studentService.getStudents().then((data)=>{
    console.log(data);
    this.students = data;
    console.log(this.students[0].name);
    });
  }
  addStudent()
  {
    this.navCtrl.push(AddStudentPage);
  }
  deleteStudent(id,index)
  {
     this.studentService.deleteStudent(id);
     if(index>-1)
     {
       this.students.splice(index,1);
     }
      console.log(id);
  }

  viewStudent(id)
  {
    console.log(id);
    this.navCtrl.push(ViewStudentPage,{id:id});
  }

}
