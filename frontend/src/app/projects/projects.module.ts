import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// TODO: add normal imports like @app
import { ProjectsBoardComponent } from './projects-board.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectCardContainerComponent } from './project-card/project-card-container.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectViewContainerComponent } from './project-view/project-view-container.component';
import { ProjectTaskCardComponent } from './project-task-card/project-task-card.component';
import { ProjectTaskCardContainerComponent } from './project-task-card/project-task-card-container.component';
import { ProjectTaskViewComponent } from './project-task-view/project-task-view.component';
import { ProjectTaskViewContainerComponent } from './project-task-view/project-task-view-container.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsBoardContainerComponent } from './projects-board-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ],
  declarations: [
    ProjectsBoardComponent, 
    ProjectCardComponent, 
    ProjectCardContainerComponent, 
    ProjectViewComponent, 
    ProjectViewContainerComponent, 
    ProjectTaskCardComponent, 
    ProjectTaskCardContainerComponent, 
    ProjectTaskViewComponent, 
    ProjectTaskViewContainerComponent, 
    ProjectsBoardContainerComponent
  ]
})
export class ProjectsModule { }
