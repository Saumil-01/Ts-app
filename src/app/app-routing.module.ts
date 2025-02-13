import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './Mycomponents/task/task.component';

const routes: Routes = [
{
  path : "", component:TaskComponent
},
{
  path : "task", component:TaskComponent

}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
