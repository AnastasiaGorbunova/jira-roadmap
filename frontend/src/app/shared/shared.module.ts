import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material.module';
import { HeaderComponent } from '@app/shared/header/header.component';
import { HeaderContainerComponent } from '@app/shared/header/header-container.component';
import { ProjectDialogComponent } from '@app/shared/dialogs/project-dialog/project-dialog.component';
import { ConfirmActionDialogComponent } from '@app/shared/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { IssueDialogComponent } from './dialogs/issue-dialog/issue-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    HeaderContainerComponent,
    HeaderComponent,
    ProjectDialogComponent,
    ConfirmActionDialogComponent,
    IssueDialogComponent
  ],
  declarations: [
    HeaderContainerComponent,
    HeaderComponent,
    ProjectDialogComponent,
    ConfirmActionDialogComponent,
    IssueDialogComponent
  ]
})
export class SharedModule { }
