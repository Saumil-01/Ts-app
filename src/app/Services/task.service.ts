import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl =   'http://localhost:5096/api/Task' 

  constructor() {   }

  http = inject(HttpClient)

  getAllTasks()
  {
    return this.http.get<Task[]>(this.apiUrl) 
  }

  addtask(data : any)
  {
    return this.http.post(this.apiUrl, data);
  }

  deleteTask(id:number)
  {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
