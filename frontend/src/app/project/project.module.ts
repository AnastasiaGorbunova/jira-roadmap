import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponent } from '@app/project/project.component';
import { ProjectContainerComponent } from '@app/project/project-container.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProjectRoutingModule } from '@app/project/project-routing.module';
import { TaskCardComponent } from '@app/project/task-card/task-card.component';
import { TaskCardContainerComponent } from '@app/project/task-card/task-card-container.component';
import { TaskComponent } from '@app/project/task/task.component';
import { TaskContainerComponent } from '@app/project/task/task-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule
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
