import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
studentEditForm!:FormGroup;
sub=['English','Maths','chemistry','physics','biology','social']
dist=['trivandram','kollam','kozhikode','wayanad','kannur','palakkad','thrissur','ernakulam','idukki','malappuram']
studentDatas:any;
constructor(private fb:FormBuilder,private stu:StudentService,
  private router:Router
){}

ngOnInit(): void {
  this.studentEditForm=this.fb.group({
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    date_of_birth:[new Date()],
    email:['',Validators.email],
    subject:this.fb.array([],[Validators.required]),
    address_form:this.fb.group({
      address:['',Validators.required],
      district:['']
    })
  })
  this.studentDatas=this.stu.studentEdit as {subject:string[]};
  console.log('gg',this.studentDatas)
  if(this.studentDatas){
    this.studentEditForm.patchValue({
      first_name:this.studentDatas.first_name,
      last_name:this.studentDatas.last_name,
      date_of_birth:this.studentDatas.date_of_birth,
      email:this.studentDatas.email,
      address_form: {
        address:this.studentDatas.address_form.address,
      district:this.studentDatas.address_form.district
      }
      
    })
  }
  console.log(this.studentDatas.subject)
  const subjectArray=this.studentEditForm.get('subject') as FormArray
  this.studentDatas.subject.forEach((sub:any)=>{
    subjectArray.push(new FormControl(sub))
  })
}
onsubmit(student:{first_name:string,last_name:string,date_of_birth:string,email:string,subject:[],address:string,district:string}){
  this.stu.updateData(this.studentDatas.id,student).subscribe(()=>{
    this.router.navigate(['/list'])
  })
}
onChange(sub:any){
  let sb =this.studentEditForm.get('subject') as FormArray
  if(sub.target.checked){
   sb.push(new FormControl(sub.target.value))
  }
  else{
   let i=0;
   sb.controls.forEach((sv:any)=>{
    if(sv.value==sub.target.value){
      sb.removeAt(i)
      return
    }
    i++
   })
 
  }
 }
 onBack(){
  this.router.navigate(['/view'])
 }
}
