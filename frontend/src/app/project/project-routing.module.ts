import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectContainerComponent } from '@app/project/project-container.component';
import { IssueContainerComponent } from '@app/project/issue/issue-container.component';

const projectRoutes: Routes = [
  {
    path: ':projectId',
    children: [
      {

        // TODO: добавить гуард для проверки есть ли у юзера доступ к этому проекту
        path: '',
        component: ProjectContainerComponent,
      },
      {
        path: 'issue/:issueId',
        component: IssueContainerComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
