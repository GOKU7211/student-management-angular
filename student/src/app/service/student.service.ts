import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
studentView:any;
studentEdit:any;
url="https://studentpro-5c213-default-rtdb.firebaseio.com/students.json"
  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<{[key:string]: Student}>(this.url).pipe(map((response)=>{
      let students=[];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          students.push({...response[key],id:key})
        }
      }
      return students
    }))
  }

  getDataById(id:string){}

  createData(data:any){
    return this.http.post(this.url,data)
  }

  updateData(id:string, data:Student){
    return this.http.put('https://studentpro-5c213-default-rtdb.firebaseio.com/students/'+id+'.json',data)
  } 

  deleteData(id:string |undefined){
    return this.http.delete('https://studentpro-5c213-default-rtdb.firebaseio.com/students/'+id+'.json')
  }

}
