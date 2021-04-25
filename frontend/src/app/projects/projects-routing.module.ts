import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsBoardContainerComponent } from './projects-board-container.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsBoardContainerComponent,
    children: []
  }
];

@NgModule({
    imports: [RouterModule.forChild(projectsRoutes)],
    exports: [RouterModule]
  })
export class ProjectsRoutingModule { }
