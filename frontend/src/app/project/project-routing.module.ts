import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectContainerComponent } from '@app/project/project-container.component';

// TODO: add guards
const projectRoutes: Routes = [
  {
    path: ':projectId',
    component: ProjectContainerComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(projectRoutes)],
    exports: [RouterModule]
  })
export class ProjectRoutingModule { }
