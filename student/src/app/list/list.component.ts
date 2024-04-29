import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { Student } from '../model/student.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
studentData:Student[]=[];
val=false;
constructor(private stu:StudentService,
  private router:Router,
  private http:HttpClient
){}

  ngOnInit(): void {
    this.stu.getData().subscribe((res) => {
      console.log('res', res);
      this.studentData = res;
      if (this.studentData && this.studentData.length > 0) {
        this.val = true;
      } else {
        this.val = false;
      }
    });
}
onDelete(id:string | undefined){
  if(confirm('Are you sure')){
    this.stu.deleteData(id).subscribe(()=>{
        this.stu.getData().subscribe((res)=>{
          this.studentData=res
        })
    })
    this.router.navigate(['/list'])
  }
}
clearAll(){
  if(confirm('do you want to delete all!!..')){
    this.http.delete('https://studentpro-5c213-default-rtdb.firebaseio.com/students.json').subscribe(()=>{
      this.stu.getData().subscribe((res)=>{
        this.studentData=res
      })
    })
    this.router.navigate(['/home'])
  }
}
onView(id:string | undefined){
  let currentview=this.studentData.find((st)=>{return st.id === id})
  this.stu.studentView=currentview
  this.router.navigate(['/view'])
}
}
