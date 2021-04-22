import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsBoardComponent } from './projects-board.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsBoardComponent,
    children: []
  }
];

@NgModule({
    imports: [RouterModule.forChild(projectsRoutes)],
    exports: [RouterModule]
  })
export class ProjectsRoutingModule { }
