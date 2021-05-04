import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectComponent } from '@app/project/project.component';
import { ProjectContainerComponent } from '@app/project/project-container.component';
import { SharedModule } from '@app/shared/shared.module';
import { ProjectRoutingModule } from '@app/project/project-routing.module';
import { IssueCardComponent } from '@app/project/issue-card/issue-card.component';
import { IssueCardContainerComponent } from '@app/project/issue-card/issue-card-container.component';
import { IssueComponent } from '@app/project/issue/issue.component';
import { IssueContainerComponent } from '@app/project/issue/issue-container.component';

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
    IssueCardComponent, 
    IssueCardContainerComponent, 
    IssueComponent, 
    IssueContainerComponent
  ]
})
export class ProjectModule { }
