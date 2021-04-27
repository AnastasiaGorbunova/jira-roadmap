import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsBoardComponent } from '@app/projects-board/projects-board.component';
import { ProjectsBoardContainerComponent } from '@app/projects-board/projects-board-container.component';
import { ProjectsBoardRoutingModule } from '@app/projects-board/projects-board-routing.module';
import { ProjectCardComponent } from '@app/projects-board/project-card/project-card.component';
import { ProjectCardContainerComponent } from '@app/projects-board/project-card/project-card-container.component';
import { SharedModule } from '@app/shared/shared.module';

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
