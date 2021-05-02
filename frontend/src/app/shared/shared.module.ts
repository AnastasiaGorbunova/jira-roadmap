import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material.module';
import { HeaderComponent } from '@app/shared/header/header.component';
import { HeaderContainerComponent } from '@app/shared/header/header-container.component';
import { CreateProjectDialogComponent } from '@app/shared/dialogs/create-project-dialog/create-project-dialog.component';
import { ConfirmActionDialogComponent } from '@app/shared/dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { CreateTaskDialogComponent } from '@app/shared/dialogs/create-task-dialog/create-task-dialog.component';

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
    CreateProjectDialogComponent,
    ConfirmActionDialogComponent,
    CreateTaskDialogComponent
  ],
  declarations: [
    HeaderContainerComponent,
    HeaderComponent,
    CreateProjectDialogComponent,
    ConfirmActionDialogComponent,
    CreateTaskDialogComponent
  ],
  entryComponents: [
    CreateProjectDialogComponent
  ]
})
export class SharedModule { }
