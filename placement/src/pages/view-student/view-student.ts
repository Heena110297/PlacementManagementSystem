import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentProvider } from '../../providers/student/student';
import { EditStudentPage } from '../edit-student/edit-student';
 
/**
 * Generated class for the ViewStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-student',
  templateUrl: 'view-student.html',
})
export class ViewStudentPage {
  id : any;
  student:any;
  name:string;
  constructor(public navCtrl: NavController,public studentService: StudentProvider, public navParams: NavParams) {
     this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewStudentPage');
 
    this.studentService.getStudent(this.id).then((dataN)=>{
    console.log(dataN);
    this.student = dataN;
    console.log(this.student[0].name);
  
  });
 }

 editStudent(student)
  {
    console.log(student);
    this.navCtrl.push(EditStudentPage,{student:student});
  }

}
