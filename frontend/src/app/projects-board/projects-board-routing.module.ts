import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsBoardContainerComponent } from '@app/projects-board/projects-board-container.component';

const projectsBoardRoutes: Routes = [
  {
    path: '',
    component: ProjectsBoardContainerComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(projectsBoardRoutes)],
    exports: [RouterModule]
  })
export class ProjectsBoardRoutingModule { }
