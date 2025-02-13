import { Component, inject, ViewChild } from '@angular/core';
import { Task } from '../../Models/task';
import { TaskService } from '../../Services/task.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',

})
export class TaskComponent {
  @ViewChild('taskForm') taskForm!: NgForm; // Access the form


taskList : Task[] = [] 
taskService = inject(TaskService)


task = {
  taskName: '',
  startTime: '',
  endTime: '',
  completed: ''
};



ngOnInit(): void {
  this.gettasks(); // Fetch the tasks after component initialization
}


    openModal(){
      const tskmodal = document.getElementById('myModal')
      if(tskmodal != null){
        tskmodal.style.display="block";
      }
    }
//both conditions are same but writing pattern is differnet 
    closeModal(){
      const tskmodal = document.getElementById('myModal')
      if(tskmodal){
        tskmodal.style.display="none";
      }
    }

    gettasks(){
      this.taskService.getAllTasks().subscribe((res: Task[]) => {
        console.log(res);  // Log the full response

        //   this.taskList = res.map(task => ({
        //   ...task,
        //   startTime: this.datePipe.transform(task.startTime, 'yyyy-MM-dd HH:mm:ss'),
        //   endTime: this.datePipe.transform(task.endTime, 'yyyy-MM-dd HH:mm:ss')
        // }));
        this.taskList = res.map(task => ({
          ...task,
          startTime: new Date(task.startTime),
          endTime: new Date(task.endTime)
        }));
        
      })
    }


    // gettasks() {
    //   this.taskService.getAllTasks().subscribe({
    //     next: (res: Task[]) => {
    //       console.log('API Response:', res);
    
    //       if (!res || res.length === 0) {
    //         console.warn('No tasks received!');
    //         this.taskList = [];
    //         return;
    //       }
    
    //       this.taskList = res.map(task => ({
    //         ...task,
    //         startTime: task.startTime ? new Date(task.startTime) : '',  
    //         endTime: task.endTime ? new Date(task.endTime) : ''            //       }));
    
    //       console.log('Updated Task List:', this.taskList);
    //     },
    //     error: (err) => {
    //       console.error('Error fetching tasks:', err);
    //     }
    //   });
    // }
    
    

    submitForm() {
      console.log('Task Data:', this.task);
      if(this.taskForm.invalid){
        alert("Please fill all details");
        return;
      }


      this.taskService.addtask(this.task).subscribe((res)=>{
        alert('Task Added')
        this.gettasks();
        this.taskForm.reset()
        this.closeModal()
      })
    }
  
    onDelete(id : number){
      this.taskService.deleteTask(id).subscribe((res)=>{
        alert('Task Deleted Successfully')
        this.gettasks();
      })
    }
    resetForm(form: any) {
      form.reset();
      this.closeModal()
    }
   
    sortTasks() {
      this.taskList.sort((a, b) => {
        const durationA = new Date(a.endTime).getTime() - new Date(a.startTime).getTime();
        const durationB = new Date(b.endTime).getTime() - new Date(b.startTime).getTime();
    
        return durationA - durationB; // Sorting by least number of days
      });
    }
    

    // sortTasks() {
    //   this.taskList.sort((a, b) => {
    //     const dateA = new Date(a.startTime).getTime();
    //     const dateB = new Date(b.startTime).getTime();
    //     const endDateA = new Date(a.endTime).getTime();
    //     const endDateB = new Date(b.endTime).getTime();
    
    //     return dateA - dateB || endDateA - endDateB;
    //   });
    // }
    

}

  