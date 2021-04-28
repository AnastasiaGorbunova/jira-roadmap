import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectContainerComponent } from '@app/project/project-container.component';
import { TaskContainerComponent } from '@app/project/task/task-container.component';

// TODO: add guards
const projectRoutes: Routes = [
  {

    path: ':projectId',
    children: [
      {
        path: '',
        component: ProjectContainerComponent,
      },
      {
        path: 'task/:taskId',
        component: TaskContainerComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
