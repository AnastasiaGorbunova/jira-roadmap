import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO: add normal imports like @app
import { ProjectsBoardComponent } from './projects-board.component';
import { ProjectsBoardRoutingModule } from './projects-board-routing.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectCardContainerComponent } from './project-card/project-card-container.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsBoardContainerComponent } from './projects-board-container.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectsBoardRoutingModule
  ],
  declarations: [
    ProjectsBoardComponent, 
    ProjectsBoardContainerComponent,
    ProjectCardComponent, 
    ProjectCardContainerComponent,
  ]
})
export class ProjectsBoardModule { }
