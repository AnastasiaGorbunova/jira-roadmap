import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectContainerComponent } from '@app/project/project-container.component';
import { IssueContainerComponent } from '@app/project/issue/issue-container.component';
import { ProjectGuard } from '@app/core/guards/project.guard';
import { IssueGuard } from '@app/core/guards/issue.guard';

const projectRoutes: Routes = [
  {
    path: ':projectId',
    children: [
      {
        path: '',
        component: ProjectContainerComponent,
        canActivate: [ProjectGuard]
      },
      {
        path: 'issue/:issueId',
        component: IssueContainerComponent,
        canActivate: [IssueGuard]
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
