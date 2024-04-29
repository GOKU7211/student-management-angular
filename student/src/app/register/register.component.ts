import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
registrationForm!:FormGroup;
dist=['trivandram','kollam','kozhikode','wayanad','kannur','palakkad','thrissur','ernakulam','idukki','malappuram']
sub=['English','Maths','chemistry','physics','biology','social']
constructor(private fb:FormBuilder,
  private stu:StudentService,
  private router:Router,
  private toster:ToastrService
){}

ngOnInit(): void {
  this.registrationForm=this.fb.group({
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
  
}

createStudentData(students:{first_name:string,last_name:string,date_of_birth:string,email:string,subject:[],address:string,district:string}){
 this.stu.createData(students).subscribe((res)=>{
  console.log(res)
  if(this.registrationForm.valid){
    this.showSuccess()
  }
  this.router.navigate(['/home'])
 })
 console.log(this.registrationForm.value)
}
showSuccess(){
 this.toster.success('submitted successfully')
}

onChange(sub:any){
 let sb =this.registrationForm.get('subject') as FormArray
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
// oneCheckBox(){
//   const validator= (control:any)=>{
//     const checked=control.value.some((value:any)=> value === true);
//     return checked ? null : {atleastone:true};
//   };
//   return validator
// }
}
