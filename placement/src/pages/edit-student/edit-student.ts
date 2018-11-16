import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import {CgpaValidator} from '../../validators/cgpa';
import {RollnoValidator} from '../../validators/rollno';
import { StudentProvider } from '../../providers/student/student';
import { UserListPage } from '../user-list/user-list';

/**
 * Generated class for the EditStudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-student',
  templateUrl: 'edit-student.html',
})
export class EditStudentPage {
formgroup:FormGroup ; 
   name : AbstractControl ;
   rollno : AbstractControl;
   department:AbstractControl;
   cgpa :AbstractControl;
   emailid:AbstractControl;

   submitAttempt: boolean =false;
   student:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public studentService: StudentProvider,
              public formbuilder:FormBuilder) {
              this.student = navParams.get('student');

              this.formgroup = formbuilder.group({
           name : ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-Z ]*'),Validators.required])],
           rollno: ['',Validators.compose([RollnoValidator.isValid,Validators.required])],
           department : ['',Validators.required],
           cgpa : ['',Validators.compose([CgpaValidator.isValid,Validators.required])],
           emailid : ['',Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),Validators.required])]


           });
            this.name = this.formgroup.controls['name'];
             this.rollno = this.formgroup.controls['rollno'];
              this.department = this.formgroup.controls['department'];
               this.cgpa = this.formgroup.controls['cgpa'];
                this.emailid = this.formgroup.controls['emailid'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStudentPage');
  }

  updateStudent()
  {
    this.submitAttempt =true;
   if(!this.formgroup.valid)
   {
    console.log("invalid form");
   }
   else
   {
    console.log("submitted");
    let student = {
    name:this.formgroup.controls.name.value,
    rollno:this.formgroup.controls.rollno.value,
    department:this.formgroup.controls.department.value,
    cgpa:this.formgroup.controls.cgpa.value,
    emailid:this.formgroup.controls.emailid.value
    };
    this.studentService.updateStudent(this.student._id,student);
    this.navCtrl.push(UserListPage);
  }
  }

}
