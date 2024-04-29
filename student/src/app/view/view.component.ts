import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {

studentView:any;

constructor(private stu:StudentService, private router:Router){}

ngOnInit(): void {
  
  this.studentView=this.stu.studentView
  console.log('this',this.studentView)
}
onBack(){
  this.router.navigate(['/list'])
}
onEdit(){
  this.stu.studentEdit=this.studentView;
  this.router.navigate(['/edit'])
}
onback(){
  this.router.navigate(['/list'])
}
}
