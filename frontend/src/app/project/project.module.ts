import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponent } from './project.component';
import { ProjectContainerComponent } from './project-container.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCardContainerComponent } from './task-card/task-card-container.component';
import { TaskComponent } from './task/task.component';
import { TaskContainerComponent } from './task/task-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectComponent, 
    ProjectContainerComponent, 
    TaskCardComponent, 
    TaskCardContainerComponent, 
    TaskComponent, 
    TaskContainerComponent
  ]
})
export class ProjectModule { }
